import { Octokit } from "@octokit/rest";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function fetchIssues() {
  const owner = process.env.REPO_OWNER;
  const repo = process.env.REPO_NAME;

  console.log(`Fetching issues for ${owner}/${repo}`);

  // Fetch all open issues
  const issues = await octokit.issues.listForRepo({
    owner,
    repo,
    state: "open",
    per_page: 100,
  });

  // Process each issue
  const posts = issues.data.map((issue) => {
    // Extract tags from labels
    const tags = issue.labels.map((label) => 
      typeof label === 'object' ? label.name : label
    );

    // Check if the issue should be published (has "publish" label)
    const isPublished = tags.includes("publish");

    if (!isPublished) {
      return null;
    }

    return {
      id: issue.number,
      title: issue.title,
      content: issue.body,
      date: issue.created_at,
      lastUpdated: issue.updated_at,
      author: issue.user.login,
      tags: tags.filter((tag) => tag !== "publish"),
      url: issue.html_url,
    };
  }).filter(Boolean); // Remove null items (unpublished posts)

  // Create data directories if they don't exist
  const srcDataDir = path.join(__dirname, "..", "src", "data");
  const publicDataDir = path.join(__dirname, "..", "public", "data");
  
  if (!fs.existsSync(srcDataDir)) {
    fs.mkdirSync(srcDataDir, { recursive: true });
  }
  
  if (!fs.existsSync(publicDataDir)) {
    fs.mkdirSync(publicDataDir, { recursive: true });
  }

  // Write the processed issues to JSON files in both directories
  const postsJson = JSON.stringify(posts, null, 2);
  fs.writeFileSync(path.join(srcDataDir, "posts.json"), postsJson);
  fs.writeFileSync(path.join(publicDataDir, "posts.json"), postsJson);

  console.log(`Fetched and processed ${posts.length} published issues.`);
}

fetchIssues().catch(console.error);