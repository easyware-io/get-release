import * as core from '@actions/core';
import * as github from '@actions/github';

export default async function run(): Promise<void> {
  try {
    core.debug('Getting owner and repo from context');
    const currentOwner = github.context.repo.owner;
    const currentRepo = github.context.repo.repo;

    core.debug('Getting inputs from the user');
    const token = core.getInput('token', { required: true });
    const tag = core.getInput('tag_name');
    const release_name = core.getInput('release_name');
    const owner = core.getInput('owner') || currentOwner;
    const repo = core.getInput('repo') || currentRepo;

    core.debug(`Creating Octokit instance with token: ${token}`);
    const octokit = github.getOctokit(token);

    let release = null;

    if (release_name != null && release_name !== '') {
      core.debug(`Getting release by name ${release_name} from ${owner}/${repo}`);
      const allReleases = await octokit.rest.repos.listReleases({
        owner,
        repo,
      });

      core.debug(`${allReleases.data.length} releases found: ${JSON.stringify(allReleases.data)}`);
      const filteredReleases = allReleases.data.filter((r) => r.name === release_name);

      core.debug(`${filteredReleases.length} filtered releases: ${JSON.stringify(filteredReleases)}`);
      if (filteredReleases.length === 1) {
        core.debug(`Release found: ${filteredReleases[0]}`);
        release = filteredReleases[0];
      } else if (filteredReleases.length > 1) {
        core.error(`Multiple releases with name ${release_name} found.`);
        core.setFailed(`Multiple releases with name ${release_name} found.`);
        return;
      }
    } else if (tag != null && tag !== '') {
      core.debug(`Getting release by tag ${tag} from ${owner}/${repo}`);
      release = JSON.parse(
        JSON.stringify(
          await octokit.rest.repos.getReleaseByTag({
            owner,
            repo,
            tag,
          })
        )
      );
    }

    core.debug(`Release: ${release}`);
    if (release == null) {
      core.error(`No release found.`);
      core.setFailed(`No release found.`);
      return;
    }

    core.debug(`Setting outputs`);
    core.setOutput('id', release.id);
    core.setOutput('name', release.name);
    core.setOutput('tag_name', release.tag_name);
    core.setOutput('body', release.body);
    core.setOutput('draft', release.draft);
    core.setOutput('prerelease', release.prerelease);
    core.setOutput('created_at', release.created_at);
    core.setOutput('published_at', release.published_at);
    core.setOutput('url', release.url);
    core.setOutput('html_url', release.html_url);
    core.setOutput('assets_url', release.assets_url);
    core.setOutput('upload_url', release.upload_url);
    core.setOutput('tarball_url', release.tarball_url);
    core.setOutput('zipball_url', release.zipball_url);
    core.setOutput('node_id', release.node_id);
    core.setOutput('author_login', release.author.login);
    core.setOutput('author_id', release.author.id);
    core.setOutput('author_node_id', release.author.node_id);
    core.setOutput('author_avatar_url', release.author.avatar_url);
    core.setOutput('author_html_url', release.author.html_url);
    core.setOutput('author_followers_url', release.author.followers_url);
    core.setOutput('author_following_url', release.author.following_url);
    core.setOutput('author_gists_url', release.author.gists_url);
    core.setOutput('author_starred_url', release.author.starred_url);
    core.setOutput('author_subscriptions_url', release.author.subscriptions_url);
    core.setOutput('author_organizations_url', release.author.organizations_url);
    core.setOutput('author_repos_url', release.author.repos_url);
    core.setOutput('author_events_url', release.author.events_url);
    core.setOutput('author_received_events_url', release.author.received_events_url);
    core.setOutput('author_type', release.author.type);
    core.setOutput('author_site_admin', release.author.site_admin);
  } catch (error) {
    core.setOutput('id', null);
    core.setOutput('name', null);
    core.setOutput('tag_name', null);
    core.setOutput('body', null);
    core.setOutput('draft', null);
    core.setOutput('prerelease', null);
    core.setOutput('created_at', null);
    core.setOutput('published_at', null);
    core.setOutput('url', null);
    core.setOutput('html_url', null);
    core.setOutput('assets_url', null);
    core.setOutput('upload_url', null);
    core.setOutput('tarball_url', null);
    core.setOutput('zipball_url', null);
    core.setOutput('node_id', null);
    core.setOutput('author_login', null);
    core.setOutput('author_id', null);
    core.setOutput('author_node_id', null);
    core.setOutput('author_avatar_url', null);
    core.setOutput('author_html_url', null);
    core.setOutput('author_followers_url', null);
    core.setOutput('author_following_url', null);
    core.setOutput('author_gists_url', null);
    core.setOutput('author_starred_url', null);
    core.setOutput('author_subscriptions_url', null);
    core.setOutput('author_organizations_url', null);
    core.setOutput('author_repos_url', null);
    core.setOutput('author_events_url', null);
    core.setOutput('author_received_events_url', null);
    core.setOutput('author_type', null);
    core.setOutput('author_site_admin', null);
    core.info(`Release not found.`);
  }
}

if (require.main === module) {
  run();
}
