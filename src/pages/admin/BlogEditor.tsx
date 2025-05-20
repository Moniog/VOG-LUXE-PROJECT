import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Container from '../../components/Container';
import Button from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';
import slugify from 'slugify';
import { Save, Image, Link as LinkIcon } from 'lucide-react';

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg prose-invert max-w-none min-h-[400px] focus:outline-none'
      }
    }
  });

  useEffect(() => {
    fetchCategories();
    fetchTags();
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchCategories = async () => {
    const { data } = await supabase.from('blog_categories').select('*');
    setCategories(data || []);
  };

  const fetchTags = async () => {
    const { data } = await supabase.from('blog_tags').select('*');
    setTags(data || []);
  };

  const fetchPost = async (postId: string) => {
    const { data: post } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_post_categories(category_id),
        blog_post_tags(tag_id)
      `)
      .eq('id', postId)
      .single();

    if (post) {
      setTitle(post.title);
      setExcerpt(post.excerpt || '');
      setFeaturedImage(post.featured_image || '');
      editor?.commands.setContent(post.content);
      setSelectedCategories(post.blog_post_categories.map(pc => pc.category_id));
      setSelectedTags(post.blog_post_tags.map(pt => pt.tag_id));
    }
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!title || !editor?.getHTML()) return;

    setSaving(true);
    const slug = slugify(title, { lower: true, strict: true });
    const content = editor.getHTML();

    try {
      let postId = id;
      
      if (!postId) {
        // Create new post
        const { data: post, error: postError } = await supabase
          .from('blog_posts')
          .insert({
            title,
            slug,
            content,
            excerpt,
            featured_image: featuredImage,
            status,
            author_id: (await supabase.auth.getUser()).data.user?.id,
            published_at: status === 'published' ? new Date().toISOString() : null
          })
          .select()
          .single();

        if (postError) throw postError;
        postId = post.id;
      } else {
        // Update existing post
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({
            title,
            slug,
            content,
            excerpt,
            featured_image: featuredImage,
            status,
            published_at: status === 'published' ? new Date().toISOString() : null
          })
          .eq('id', id);

        if (updateError) throw updateError;
      }

      // Update categories
      await supabase
        .from('blog_post_categories')
        .delete()
        .eq('post_id', postId);

      if (selectedCategories.length > 0) {
        await supabase
          .from('blog_post_categories')
          .insert(
            selectedCategories.map(categoryId => ({
              post_id: postId,
              category_id: categoryId
            }))
          );
      }

      // Update tags
      await supabase
        .from('blog_post_tags')
        .delete()
        .eq('post_id', postId);

      if (selectedTags.length > 0) {
        await supabase
          .from('blog_post_tags')
          .insert(
            selectedTags.map(tagId => ({
              post_id: postId,
              tag_id: tagId
            }))
          );
      }

      navigate('/admin/posts');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="text-3xl font-bold bg-transparent border-none focus:outline-none text-white w-full"
            />
            <div className="flex gap-4">
              <Button
                onClick={() => handleSave('draft')}
                disabled={saving}
                variant="outline"
              >
                Save Draft
              </Button>
              <Button
                onClick={() => handleSave('published')}
                disabled={saving}
              >
                {saving ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="col-span-2">
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Post excerpt"
                className="w-full h-24 p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 focus:outline-none focus:border-blue-500/50 text-white resize-none"
              />
            </div>
            <div>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="Featured image URL"
                className="w-full p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 focus:outline-none focus:border-blue-500/50 text-white"
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`p-2 rounded ${
                  editor?.isActive('bold')
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-gray-800/50 text-gray-300'
                }`}
              >
                Bold
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`p-2 rounded ${
                  editor?.isActive('italic')
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-gray-800/50 text-gray-300'
                }`}
              >
                Italic
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded ${
                  editor?.isActive('heading', { level: 2 })
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-gray-800/50 text-gray-300'
                }`}
              >
                H2
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded ${
                  editor?.isActive('bulletList')
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-gray-800/50 text-gray-300'
                }`}
              >
                Bullet List
              </button>
              <button
                onClick={() => {
                  const url = window.prompt('Enter image URL');
                  if (url) {
                    editor?.chain().focus().setImage({ src: url }).run();
                  }
                }}
                className="p-2 rounded bg-gray-800/50 text-gray-300"
              >
                <Image className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  const url = window.prompt('Enter link URL');
                  if (url) {
                    editor?.chain().focus().setLink({ href: url }).run();
                  }
                }}
                className="p-2 rounded bg-gray-800/50 text-gray-300"
              >
                <LinkIcon className="w-5 h-5" />
              </button>
            </div>

            <EditorContent editor={editor} className="min-h-[400px] bg-gray-800/50 rounded-lg p-6" />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-medium mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, category.id]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter((id) => id !== category.id)
                          );
                        }
                      }}
                      className="rounded border-gray-700/50 bg-gray-800/50 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-300">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Tags</h3>
              <div className="space-y-2">
                {tags.map((tag) => (
                  <label key={tag.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTags([...selectedTags, tag.id]);
                        } else {
                          setSelectedTags(
                            selectedTags.filter((id) => id !== tag.id)
                          );
                        }
                      }}
                      className="rounded border-gray-700/50 bg-gray-800/50 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-300">{tag.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogEditor;