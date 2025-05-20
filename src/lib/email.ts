import { createClient } from '@supabase/supabase-js';
import { supabase } from './supabase';

interface EmailSubscriber {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  preferences: {
    marketing: boolean;
    newsletter: boolean;
    productUpdates: boolean;
  };
  status: 'pending' | 'confirmed' | 'unsubscribed';
  confirmationToken?: string;
  lastEmailSent?: Date;
  bounceCount: number;
  complaintCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface EmailMetrics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  complained: number;
  timestamp: Date;
}

class EmailService {
  private static instance: EmailService;
  private suppressionList: Set<string> = new Set();
  private dailySendCount: number = 0;
  private lastReset: Date = new Date();
  private readonly companyAddress = '123 Fashion Street, New York, NY 10001';

  private constructor() {
    this.loadSuppressionList();
    this.resetDailyCounters();
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private async loadSuppressionList(): Promise<void> {
    const { data, error } = await supabase
      .from('email_suppression')
      .select('email');
    
    if (!error && data) {
      data.forEach(record => this.suppressionList.add(record.email));
    }
  }

  private resetDailyCounters(): void {
    const now = new Date();
    if (now.getDate() !== this.lastReset.getDate()) {
      this.dailySendCount = 0;
      this.lastReset = now;
    }
  }

  public async subscribe(email: string, firstName?: string, lastName?: string): Promise<boolean> {
    if (this.suppressionList.has(email)) {
      return false;
    }

    const confirmationToken = crypto.randomUUID();

    const { error } = await supabase
      .from('email_subscribers')
      .insert([{
        email,
        firstName,
        lastName,
        status: 'pending',
        confirmationToken,
        preferences: {
          marketing: true,
          newsletter: true,
          productUpdates: true
        },
        bounceCount: 0,
        complaintCount: 0
      }]);

    if (!error) {
      await this.sendConfirmationEmail(email, confirmationToken);
      return true;
    }

    return false;
  }

  public async confirmSubscription(token: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('email_subscribers')
      .update({ status: 'confirmed', confirmationToken: null })
      .match({ confirmationToken: token })
      .select();

    return !error && data && data.length > 0;
  }

  public async unsubscribe(email: string): Promise<boolean> {
    const { error } = await supabase
      .from('email_subscribers')
      .update({ status: 'unsubscribed' })
      .match({ email });

    if (!error) {
      await this.sendUnsubscribeConfirmation(email);
      return true;
    }

    return false;
  }

  private async sendUnsubscribeConfirmation(email: string): Promise<void> {
    const subject = "Unsubscribe Confirmation";
    const content = `Thank you for being part of our community. We've processed your unsubscribe request and will miss having you with us. You can resubscribe anytime by visiting our website. Take care!

To resubscribe, visit: ${window.location.origin}/newsletter

VOG LUXURY
${this.companyAddress}`;
    
    // Implementation would use Amazon SES to send the email
    // This is a placeholder for the actual implementation
  }

  private generateUnsubscribeLink(email: string): string {
    const url = new URL(`${window.location.origin}/unsubscribe`);
    url.searchParams.set('email', email);
    return url.toString();
  }

  private async sendEmail(email: string, subject: string, content: string): Promise<void> {
    // Add unsubscribe link and company address to all emails
    const fullContent = `${content}

To unsubscribe from these emails, click here: ${this.generateUnsubscribeLink(email)}

${this.companyAddress}`;

    // Implementation would use Amazon SES to send the email
    // This is a placeholder for the actual implementation
  }

  public async updatePreferences(
    email: string,
    preferences: Partial<EmailSubscriber['preferences']>
  ): Promise<boolean> {
    const { error } = await supabase
      .from('email_subscribers')
      .update({ preferences })
      .match({ email });

    return !error;
  }

  public async handleBounce(email: string): Promise<void> {
    const { data } = await supabase
      .from('email_subscribers')
      .select('bounceCount')
      .match({ email })
      .single();

    if (data) {
      const bounceCount = data.bounceCount + 1;
      if (bounceCount >= 3) {
        await this.addToSuppressionList(email);
      } else {
        await supabase
          .from('email_subscribers')
          .update({ bounceCount })
          .match({ email });
      }
    }
  }

  public async handleComplaint(email: string): Promise<void> {
    await this.addToSuppressionList(email);
  }

  private async addToSuppressionList(email: string): Promise<void> {
    await supabase
      .from('email_suppression')
      .insert([{ email }]);
    
    this.suppressionList.add(email);
    
    await supabase
      .from('email_subscribers')
      .update({ status: 'unsubscribed' })
      .match({ email });
  }

  private async sendConfirmationEmail(email: string, token: string): Promise<void> {
    const subject = "Confirm Your Email Subscription";
    const content = `Thank you for subscribing to our newsletter! Please click the link below to confirm your subscription:

${window.location.origin}/confirm-subscription?token=${token}

If you did not request this subscription, you can safely ignore this email.

To unsubscribe from these emails, click here: ${this.generateUnsubscribeLink(email)}

${this.companyAddress}`;

    await this.sendEmail(email, subject, content);
  }

  public async trackMetrics(metrics: Omit<EmailMetrics, 'timestamp'>): Promise<void> {
    await supabase
      .from('email_metrics')
      .insert([{
        ...metrics,
        timestamp: new Date()
      }]);
  }

  public async canSendEmail(email: string): Promise<boolean> {
    this.resetDailyCounters();

    if (this.dailySendCount >= 50000 || this.suppressionList.has(email)) {
      return false;
    }

    const { data } = await supabase
      .from('email_subscribers')
      .select('status, bounceCount, complaintCount')
      .match({ email })
      .single();

    return data?.status === 'confirmed' &&
           data?.bounceCount < 3 &&
           data?.complaintCount === 0;
  }
}

export const emailService = EmailService.getInstance();