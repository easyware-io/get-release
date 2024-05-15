import * as core from '@actions/core';
import * as github from '@actions/github';

export default async function run(): Promise<void> {
  try {
    core.debug('Getting owner and repo from context');
    const currentOwner = github.context.repo.owner;
    const currentRepo = github.context.repo.repo;

    core.debug('Getting inputs from the user');
    const token = core.getInput('token', { required: true });
    const tag = core.getInput('tag_name', { required: true });
    const owner = core.getInput('owner') || currentOwner;
    const repo = core.getInput('repo') || currentRepo;

    core.debug(`Creating Octokit instance with token: ${token}`);
    const octokit = github.getOctokit(token);

    core.debug(`Getting release by tag ${tag} from ${owner}/${repo}`);
    const release = await octokit.rest.repos.getReleaseByTag({
      owner,
      repo,
      tag,
    });

    core.setOutput('id', release.data.id);
    core.setOutput('name', release.data.name);
    core.setOutput('tag_name', release.data.tag_name);
    core.setOutput('body', release.data.body);
    core.setOutput('draft', release.data.draft);
    core.setOutput('prerelease', release.data.prerelease);
    core.setOutput('created_at', release.data.created_at);
    core.setOutput('published_at', release.data.published_at);
    core.setOutput('url', release.data.url);
    core.setOutput('html_url', release.data.html_url);
    core.setOutput('assets_url', release.data.assets_url);
    core.setOutput('upload_url', release.data.upload_url);
    core.setOutput('tarball_url', release.data.tarball_url);
    core.setOutput('zipball_url', release.data.zipball_url);
    core.setOutput('node_id', release.data.node_id);
    core.setOutput('author_login', release.data.author.login);
    core.setOutput('author_id', release.data.author.id);
    core.setOutput('author_node_id', release.data.author.node_id);
    core.setOutput('author_avatar_url', release.data.author.avatar_url);
    core.setOutput('author_html_url', release.data.author.html_url);
    core.setOutput('author_followers_url', release.data.author.followers_url);
    core.setOutput('author_following_url', release.data.author.following_url);
    core.setOutput('author_gists_url', release.data.author.gists_url);
    core.setOutput('author_starred_url', release.data.author.starred_url);
    core.setOutput('author_subscriptions_url', release.data.author.subscriptions_url);
    core.setOutput('author_organizations_url', release.data.author.organizations_url);
    core.setOutput('author_repos_url', release.data.author.repos_url);
    core.setOutput('author_events_url', release.data.author.events_url);
    core.setOutput('author_received_events_url', release.data.author.received_events_url);
    core.setOutput('author_type', release.data.author.type);
    core.setOutput('author_site_admin', release.data.author.site_admin);
  } catch (error) {
    core.setOutput('data', null);
    core.debug(`Release not found.`);
  }
}

if (require.main === module) {
  run();
}
