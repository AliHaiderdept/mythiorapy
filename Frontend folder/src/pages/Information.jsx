import { useEffect, useState } from "react";
import { BookOpen, ExternalLink, PlayCircle, Image as ImageIcon, Search, Sparkles } from "lucide-react";
import "./MentalHealth.css";

const sampleBooks = [
  { title: "The Happiness Trap", author: "Russ Harris", category: "ACT & wellbeing", description: "An introduction to acceptance and commitment therapy concepts.", url: "https://www.russHarris.com/" },
  { title: "Mind Over Mood", author: "Dennis Greenberger & Christine Padesky", category: "CBT workbook", description: "Structured exercises for understanding thoughts, feelings and behaviour.", url: "https://www.mindovermood.com/" },
  { title: "Why We Sleep", author: "Matthew Walker", category: "Sleep education", description: "Popular science writing about sleep and health.", url: "https://www.penguinrandomhouse.com/" },
];

const sampleVideos = [
  { title: "A short guide to mindful breathing", source: "Educational video placeholder", url: "https://www.youtube.com/results?search_query=mindful+breathing+education" },
  { title: "Understanding stress responses", source: "Educational video placeholder", url: "https://www.youtube.com/results?search_query=understanding+stress+psychology" },
];

export default function Information() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  async function loadPosts() {
    setLoading(true);
    setError("");
    try {
      // Replace with your own trusted content API endpoint.
      const response = await fetch("/api/mental-health-content");
      if (!response.ok) throw new Error("Content API is not connected yet.");
      const data = await response.json();
      setPosts(Array.isArray(data.posts) ? data.posts : []);
    } catch (err) {
      setError(err.message || "Unable to load posts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadPosts(); }, []);

  const visibleBooks = sampleBooks.filter(book => `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mh-page">
      <header className="mh-page-header">
        <div><span className="mh-eyebrow">LEARN & EXPLORE</span><h1>More</h1><p>Explore carefully selected educational resources for mental wellbeing.</p></div>
        <div className="mh-date-chip"><Sparkles size={16}/> Resource library</div>
      </header>

      <section className="mh-panel">
        <div className="mh-panel-heading"><div><span className="mh-eyebrow">READING LIST</span><h2>Book recommendations</h2><p>Educational resources, not a replacement for professional care.</p></div><BookOpen className="mh-heading-icon"/></div>
        <div className="mh-search"><Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search books or topics..."/></div>
        <div className="mh-resource-grid">
          {visibleBooks.map(book => <article className="mh-resource-card" key={book.title}><div className="mh-resource-art"><BookOpen size={34}/></div><span className="mh-tag">{book.category}</span><h3>{book.title}</h3><small>By {book.author}</small><p>{book.description}</p><a href={book.url} target="_blank" rel="noreferrer">Explore book <ExternalLink size={14}/></a></article>)}
        </div>
      </section>

      <section className="mh-panel">
        <div className="mh-panel-heading"><div><span className="mh-eyebrow">WATCH & LEARN</span><h2>Video library</h2></div><PlayCircle className="mh-heading-icon"/></div>
        <div className="mh-resource-grid">
          {sampleVideos.map(video => <article className="mh-resource-card" key={video.title}><div className="mh-video-placeholder"><PlayCircle size={42}/></div><h3>{video.title}</h3><p>{video.source}</p><a href={video.url} target="_blank" rel="noreferrer">Find video <ExternalLink size={14}/></a></article>)}
        </div>
      </section>

      <section className="mh-panel">
        <div className="mh-panel-heading"><div><span className="mh-eyebrow">COMMUNITY & UPDATES</span><h2>Posts and images</h2><p>Content loaded from your configured API.</p></div><ImageIcon className="mh-heading-icon"/></div>
        {loading && <p className="mh-muted">Loading resources...</p>}
        {error && <div className="mh-info">{error} Add your API endpoint in More.jsx to display live content.</div>}
        {!loading && posts.length === 0 && <div className="mh-empty-state"><ImageIcon size={30}/><b>No posts available</b><span>Connect a trusted content API to show articles, posts and images here.</span></div>}
        <div className="mh-resource-grid">
          {posts.map((post, index) => <article className="mh-resource-card" key={post.id || index}>
            {post.image && <img className="mh-post-image" src={post.image} alt={post.title || "Mental health resource"} />}
            <span className="mh-tag">{post.category || "Resource"}</span><h3>{post.title}</h3><p>{post.description}</p>
            {post.url && <a href={post.url} target="_blank" rel="noreferrer">Read more <ExternalLink size={14}/></a>}
          </article>)}
        </div>
        <button className="mh-secondary-button" onClick={loadPosts}>Refresh content</button>
      </section>
    </div>
  );
}
