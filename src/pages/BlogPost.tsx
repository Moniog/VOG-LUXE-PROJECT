import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Container from '../components/layout/Container';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, ImageOff } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  featured_image: string;
  published_at: string;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  author: {
    full_name: string;
    avatar: string;
  };
  tags: {
    name: string;
    slug: string;
  }[];
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug) {
          setError('No slug provided');
          return;
        }

        const { data: postData, error: postError } = await supabase
          .from('blog_posts')
          .select(`
            id,
            title,
            content,
            featured_image,
            published_at,
            category:blog_categories!blog_posts_category_id_fkey(id, name, slug),
            author:users!blog_posts_author_id_fkey(full_name, avatar),
            tags:blog_post_tags(tag:blog_tags(name, slug))
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (postError) {
          throw postError;
        }

        if (!postData) {
          setError('Post not found');
          return;
        }

        const formattedPost = {
          ...postData,
          category: postData.category,
          tags: postData.tags.map((t: any) => t.tag)
        };

        setPost(formattedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleImageError = (imageUrl: string) => {
    setImageError(prev => ({ ...prev, [imageUrl]: true }));
  };

  const ImageFallback = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center justify-center bg-gray-800 ${className}`}>
      <ImageOff className="w-8 h-8 text-gray-600" />
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <Container>
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              {error || 'Post not found'}
            </h1>
            <p className="text-gray-300">
              The post you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-32 pb-16">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #60A5FA 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <div className="absolute -left-64 -top-64 w-128 h-128 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -right-64 -bottom-64 w-128 h-128 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <Container>
        <article className="max-w-4xl mx-auto relative">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              {post.author?.avatar && !imageError[post.author.avatar] ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.full_name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={() => handleImageError(post.author.avatar)}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div>
                <p className="text-white font-medium">{post.author?.full_name || 'Anonymous'}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {post.category && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                  {post.category.name}
                </span>
              </div>
            )}

            {post.featured_image && !imageError[post.featured_image] ? (
              <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-8">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(post.featured_image)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            ) : (
              <ImageFallback className="aspect-[21/9] rounded-xl mb-8" />
            )}
          </header>

          <div className="prose prose-lg prose-invert max-w-none mb-12">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ src, alt }) => (
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden my-8">
                    {src && !imageError[src] ? (
                      <img
                        src={src}
                        alt={alt || ''}
                        className="w-full h-full object-cover"
                        onError={() => src && handleImageError(src)}
                      />
                    ) : (
                      <ImageFallback className="w-full h-full" />
                    )}
                  </div>
                )
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {post.tags?.length > 0 && (
            <div className="mb-12">
              <h3 className="text-white font-medium mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm text-gray-300"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </Container>
    </div>
  );
};

export default BlogPost;