import { useState } from 'react';
import {
  MessageCircle, ThumbsUp, MessageSquare, Search, Star,
  Shield, Award, Plus, Bot, Send, TrendingUp, Leaf,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, Button, Badge, SectionHeader, Avatar } from '@/components/ui';
import { communityPosts, experts } from '@/data/mockData';
import type { CommunityPost } from '@/types';

const categories = ['All', 'Crop Management', 'Expert Advice', 'Pest & Disease', 'Soil Health', 'Technology'];

export function CommunityPage() {
  const { navigate } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState<CommunityPost[]>(communityPosts);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'Crop Management' });

  const filtered = posts.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const handlePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    const post: CommunityPost = {
      id: `p${Date.now()}`,
      author: 'Karthik R',
      avatar: 'KR',
      role: 'Farmer · 12 yrs',
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      likes: 0, comments: 0, time: 'Just now',
      tags: ['new'], liked: false,
    };
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'Crop Management' });
    setShowNewPost(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-secondary-700 rounded-2xl p-6 text-white">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5" />
              <p className="text-primary-200 text-sm">Farmer Community</p>
            </div>
            <h2 className="font-display text-2xl font-bold">Connect. Learn. Grow together.</h2>
            <p className="text-primary-100 text-sm mt-1">விவசாயிகள் சமூகம் — Ask questions, share experiences</p>
          </div>
          <Button variant="white" size="sm" onClick={() => setShowNewPost(!showNewPost)}>
            <Plus className="w-4 h-4" /> New Post
          </Button>
        </div>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <Card className="p-5 animate-slide-down">
          <SectionHeader title="Share Your Question" tamil="உங்கள் கேள்வியை பகிரவும்" />
          <div className="space-y-3">
            <input
              type="text" placeholder="Post title..." value={newPost.title}
              onChange={e => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <select
              value={newPost.category} onChange={e => setNewPost({ ...newPost, category: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <textarea
              placeholder="Write your post..." value={newPost.content} rows={4}
              onChange={e => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={handlePost}><Send className="w-4 h-4" /> Post</Button>
              <Button variant="outline" onClick={() => setShowNewPost(false)}>Cancel</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Experts */}
      <div>
        <SectionHeader title="Connect with Experts" tamil="நிபுணர்களை அணுகவும்" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {experts.map(expert => (
            <Card key={expert.id} className="p-4 text-center hover:shadow-lg transition-shadow">
              <Avatar initials={expert.avatar} size="lg" color="secondary" />
              <p className="font-semibold text-sm text-gray-900 mt-3">{expert.name}</p>
              <p className="text-xs text-primary-600 mt-0.5">{expert.specialization}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-3.5 h-3.5 text-accent-500 fill-accent-500" />
                <span className="text-xs font-bold text-gray-900">{expert.rating}</span>
                <span className="text-xs text-gray-400">· {expert.consultations} cons.</span>
              </div>
              <div className="flex items-center justify-center gap-1 mt-1 text-xs text-gray-400">
                <Award className="w-3.5 h-3.5" /> {expert.experience} yrs exp
              </div>
              <Badge variant={expert.available ? 'success' : 'default'} className="mt-2">
                {expert.available ? 'Available' : 'Offline'}
              </Badge>
              <Button variant="outline" size="sm" fullWidth className="mt-3" disabled={!expert.available}>
                Consult
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search discussions..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat ? 'bg-primary-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Card>

      {/* Posts */}
      <div className="space-y-4">
        {filtered.map(post => (
          <Card key={post.id} className="p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3 mb-3">
              <Avatar initials={post.avatar} size="md" color="secondary" />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-sm text-gray-900">{post.author}</p>
                  {post.role.includes('Expert') || post.role.includes('Scientist') ? (
                    <Badge variant="info"><Shield className="w-3 h-3" /> Verified Expert</Badge>
                  ) : null}
                </div>
                <p className="text-xs text-gray-400">{post.role} · {post.time}</p>
              </div>
              <Badge variant="accent">{post.category}</Badge>
            </div>

            <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{post.content}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">#{tag}</span>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-50">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 text-sm transition-colors ${post.liked ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'}`}
              >
                <ThumbsUp className={`w-4 h-4 ${post.liked ? 'fill-primary-100' : ''}`} /> {post.likes}
              </button>
              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600">
                <MessageSquare className="w-4 h-4" /> {post.comments}
              </button>
              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 ml-auto">
                <MessageCircle className="w-4 h-4" /> Reply
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Tip */}
      <Card className="p-5 bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Ask Pasumai AI instead?</p>
            <p className="text-sm text-gray-600 mt-1">Get instant answers to your farming questions from our AI assistant — available 24/7.</p>
            <Button variant="primary" size="sm" className="mt-3" onClick={() => navigate('assistant')}>
              <Bot className="w-4 h-4" /> Open AI Assistant
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
