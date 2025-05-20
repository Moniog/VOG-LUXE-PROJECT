import { ReactElement } from 'react';
import { Location, matchPath } from 'react-router-dom';

interface ValidationResult {
  isValid: boolean;
  issues: Issue[];
  suggestions: string[];
}

interface Issue {
  type: 'error' | 'warning';
  message: string;
  code: string;
}

interface LinkValidatorOptions {
  routes?: RouteConfig[];
  baseUrl?: string;
  currentLocation?: Location;
  strictMode?: boolean;
}

interface RouteConfig {
  path: string;
  exact?: boolean;
}

interface ElementPosition {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export class LinkValidator {
  private routes: RouteConfig[];
  private baseUrl: string;
  private currentLocation: Location | null;
  private strictMode: boolean;

  constructor(options: LinkValidatorOptions = {}) {
    this.routes = options.routes || [];
    this.baseUrl = options.baseUrl || '';
    this.currentLocation = options.currentLocation || null;
    this.strictMode = options.strictMode || false;
  }

  public validateLink(
    target: string | HTMLAnchorElement | ReactElement
  ): ValidationResult {
    const issues: Issue[] = [];
    const suggestions: string[] = [];

    // Convert input to normalized URL string
    const url = this.normalizeTarget(target);
    if (!url) {
      issues.push({
        type: 'error',
        message: 'Invalid or empty link target',
        code: 'INVALID_TARGET'
      });
      return { isValid: false, issues, suggestions };
    }

    // Validate URL structure
    this.validateUrlStructure(url, issues, suggestions);

    // Check route configuration
    this.validateRouteConfig(url, issues, suggestions);

    // Validate HTML structure if element provided
    if (target instanceof HTMLAnchorElement) {
      this.validateHtmlStructure(target, issues, suggestions);
      this.checkOverlappingElements(target, issues, suggestions);
      this.validateEventHandlers(target, issues, suggestions);
    }

    // React-specific validations
    if (this.isReactElement(target)) {
      this.validateReactRouting(target, issues, suggestions);
    }

    return {
      isValid: issues.filter(i => i.type === 'error').length === 0,
      issues,
      suggestions
    };
  }

  private normalizeTarget(target: string | HTMLAnchorElement | ReactElement): string {
    if (typeof target === 'string') {
      return target;
    } else if (target instanceof HTMLAnchorElement) {
      return target.href;
    } else if (this.isReactElement(target)) {
      return (target.props as any).to || (target.props as any).href || '';
    }
    return '';
  }

  private validateUrlStructure(url: string, issues: Issue[], suggestions: string[]): void {
    try {
      const parsedUrl = new URL(url, this.baseUrl);

      // Check for missing leading slash in path
      if (!parsedUrl.pathname.startsWith('/') && !url.startsWith('http')) {
        issues.push({
          type: 'error',
          message: 'Path should start with a forward slash',
          code: 'MISSING_LEADING_SLASH'
        });
        suggestions.push(`Add a leading slash: /${url}`);
      }

      // Check for trailing slash consistency
      if (this.strictMode && parsedUrl.pathname.length > 1) {
        const hasTrailingSlash = parsedUrl.pathname.endsWith('/');
        if (hasTrailingSlash) {
          issues.push({
            type: 'warning',
            message: 'Inconsistent trailing slash usage',
            code: 'TRAILING_SLASH'
          });
          suggestions.push(
            `Consider removing trailing slash: ${parsedUrl.pathname.slice(0, -1)}`
          );
        }
      }

      // Validate fragment usage
      if (parsedUrl.hash && !parsedUrl.hash.startsWith('#')) {
        issues.push({
          type: 'error',
          message: 'Invalid fragment identifier',
          code: 'INVALID_FRAGMENT'
        });
        suggestions.push('Fragment should start with #');
      }
    } catch (error) {
      issues.push({
        type: 'error',
        message: 'Invalid URL format',
        code: 'INVALID_URL'
      });
    }
  }

  private validateRouteConfig(url: string, issues: Issue[], suggestions: string[]): void {
    if (this.routes.length === 0) {
      issues.push({
        type: 'warning',
        message: 'No route configuration provided for validation',
        code: 'NO_ROUTES'
      });
      return;
    }

    const normalizedPath = this.normalizePath(url);
    const matchingRoute = this.routes.find(route => 
      matchPath(route.path, normalizedPath)
    );

    if (!matchingRoute) {
      issues.push({
        type: 'error',
        message: 'No matching route found in configuration',
        code: 'NO_MATCHING_ROUTE'
      });
      
      // Suggest similar routes
      const similarRoutes = this.findSimilarRoutes(normalizedPath);
      if (similarRoutes.length > 0) {
        suggestions.push(
          `Similar routes found: ${similarRoutes.join(', ')}`
        );
      }
    }
  }

  private validateHtmlStructure(
    element: HTMLAnchorElement,
    issues: Issue[],
    suggestions: string[]
  ): void {
    // Check for missing attributes
    if (!element.href) {
      issues.push({
        type: 'error',
        message: 'Missing href attribute',
        code: 'MISSING_HREF'
      });
    }

    // Validate accessibility
    if (!element.getAttribute('aria-label') && !element.textContent?.trim()) {
      issues.push({
        type: 'warning',
        message: 'Missing accessible name',
        code: 'ACCESSIBILITY'
      });
      suggestions.push('Add aria-label or text content for screen readers');
    }

    // Check for proper rel attributes on external links
    if (this.isExternalUrl(element.href)) {
      const rel = element.getAttribute('rel');
      if (!rel || !rel.includes('noopener')) {
        issues.push({
          type: 'warning',
          message: 'External link missing security attributes',
          code: 'EXTERNAL_LINK'
        });
        suggestions.push('Add rel="noopener noreferrer" for external links');
      }
    }
  }

  private checkOverlappingElements(
    element: HTMLAnchorElement,
    issues: Issue[],
    suggestions: string[]
  ): void {
    const pos = this.getElementPosition(element);
    const overlapping = this.findOverlappingElements(pos);

    if (overlapping.length > 0) {
      issues.push({
        type: 'warning',
        message: 'Link may be obscured by other elements',
        code: 'OVERLAPPING'
      });
      suggestions.push('Check z-index and positioning of overlapping elements');
    }
  }

  private validateEventHandlers(
    element: HTMLAnchorElement,
    issues: Issue[],
    suggestions: string[]
  ): void {
    // Check for click event prevention
    const clickHandlers = this.getEventHandlers(element, 'click');
    if (clickHandlers.some(handler => handler.toString().includes('preventDefault'))) {
      issues.push({
        type: 'warning',
        message: 'Click event may be prevented',
        code: 'CLICK_PREVENTED'
      });
      suggestions.push('Review click handlers for preventDefault() calls');
    }

    // Check for multiple conflicting handlers
    if (clickHandlers.length > 1) {
      issues.push({
        type: 'warning',
        message: 'Multiple click handlers detected',
        code: 'MULTIPLE_HANDLERS'
      });
      suggestions.push('Consolidate click handlers to prevent conflicts');
    }
  }

  private validateReactRouting(
    element: ReactElement,
    issues: Issue[],
    suggestions: string[]
  ): void {
    const props = element.props as any;

    // Check for proper routing component usage
    if (props.href && !props.to) {
      issues.push({
        type: 'warning',
        message: 'Using href instead of to prop with React Router',
        code: 'REACT_ROUTER_PROPS'
      });
      suggestions.push('Use <Link to="..."> instead of href for internal routing');
    }

    // Validate state handling
    if (props.to && typeof props.to === 'object' && !props.to.pathname) {
      issues.push({
        type: 'error',
        message: 'Invalid to prop object structure',
        code: 'INVALID_TO_PROP'
      });
      suggestions.push('Include pathname in to prop object');
    }
  }

  private getElementPosition(element: HTMLElement): ElementPosition {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left
    };
  }

  private findOverlappingElements(pos: ElementPosition): Element[] {
    const elements = document.elementsFromPoint(
      (pos.left + pos.right) / 2,
      (pos.top + pos.bottom) / 2
    );
    return elements.filter(el => el !== document.documentElement);
  }

  private getEventHandlers(element: HTMLElement, eventType: string): Function[] {
    const handlers: Function[] = [];
    const symbolKey = Object.getOwnPropertySymbols(element)
      .find(sym => sym.toString().includes('events'));
    
    if (symbolKey) {
      const events = (element as any)[symbolKey];
      if (events && events[eventType]) {
        handlers.push(...events[eventType]);
      }
    }
    
    return handlers;
  }

  private isExternalUrl(url: string): boolean {
    try {
      const parsed = new URL(url, this.baseUrl);
      return parsed.origin !== window.location.origin;
    } catch {
      return false;
    }
  }

  private normalizePath(url: string): string {
    try {
      const parsed = new URL(url, this.baseUrl);
      return parsed.pathname;
    } catch {
      return url;
    }
  }

  private findSimilarRoutes(path: string): string[] {
    return this.routes
      .map(route => route.path)
      .filter(routePath => {
        const similarity = this.calculateSimilarity(path, routePath);
        return similarity > 0.7; // 70% similarity threshold
      });
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) {
      return 1.0;
    }
    
    return (longer.length - this.editDistance(longer, shorter)) / longer.length;
  }

  private editDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str1.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str2.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str1.length][str2.length];
  }

  private isReactElement(element: any): element is ReactElement {
    return element && element.$$typeof === Symbol.for('react.element');
  }
}

// Example usage:
/*
const validator = new LinkValidator({
  routes: [
    { path: '/home' },
    { path: '/about' },
    { path: '/products/:id' }
  ],
  baseUrl: 'https://example.com',
  strictMode: true
});

const result = validator.validateLink('/about');
console.log(result);
*/