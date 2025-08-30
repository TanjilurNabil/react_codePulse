import { useEffect, useState } from 'react';
import blogService from '../services/blogService';

const BlogHome = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [error, setError] = useState(null);
    const fetchBlogPosts = () => {
        blogService.getBlogPosts().then(response => {
            setBlogPosts(response.data);
        }).catch(err => {
            setError("Error fetching blog posts");
            console.error(err);
        });
    };
    useEffect(() => { fetchBlogPosts() }, []);
    return (
        <div>
            {error && <div className='error'>{error}</div>}
            <div className='row'>
                {blogPosts.map((post) => (
                
                    <div key={post.id} className='col-12 col-md-4 mb-3'>
                        <div  className='card h-100'>
                            <img src={post.featuredImageUrl} className="card-img-top" alt="blog_Image" />
                            <div className='card-body d-flex flex-column'>
                                <h5 className='card-title'>
                                    {post.title}
                                </h5>
                                <p className="card-text">{ post.shortDescription}</p>
                            </div>
                        </div>
                    </div>
            )) }
            </div>
            
        </div>
    );
};

export default BlogHome;