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

    core.debug(`Getting release by tag: ${tag}`);
    const release = await octokit.rest.repos.getReleaseByTag({
      owner,
      repo,
      tag,
    });

    core.setOutput('data', JSON.parse(JSON.stringify(release.data)));
  } catch (error) {
    core.setOutput('data', null);
    core.debug(`Release not found.`);
  }
}

if (require.main === module) {
  run();
}
