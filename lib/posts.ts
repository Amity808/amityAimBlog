import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark';
// import { Html } from 'next/document';
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(),'blogposts')


export function getStortedPostsData() {
    // Get file names under posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // remove ".md" from file name to get id 
        const id = fileName.replace(/\.md$/,'')

        // read markdown fiile as a string 

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        // use gray-matter to parse the metadata section
        const matterResult = matter(fileContents)

        const blogPost: BlogPost = {
            id, 
            title: matterResult.data.title,
            date: matterResult.data.date,
        }

        // combine the data with thr id
        return blogPost;
    });
    

    // sort post by date
    return allPostsData.sort((a,b) => a.date < b.date ? 1 : -1)
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContent = fs.readFileSync(fullPath, 'utf-8');

    // use gray-matter to parse the post metadata section 
    const matterResult = matter(fileContent);

    const processedContent = await remark().use(html).process(matterResult.content)
    
    const contentHtml = processedContent.toString()

    const blogPostWithHTML: BlogPost & { contentHtml: string } = {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        contentHtml
    }

    return blogPostWithHTML;
}