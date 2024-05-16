# easyware-io/get-release@v1

![CI](https://github.com/easyware-io/get-release/actions/workflows/build.yml/badge.svg)

Gets the release data from GitHub for a specific release based on the release tag.

## Usage

### Basic usage

```yaml
- name: Get release
  uses: easyware-io/get-release@v1
  with:
    release_name: v1.0.0
    token: ${{ secrets.GITHUB_TOKEN }}
```

### Inputs

#### `token`

GitHub token

#### `release_name`

Release name of the release. Takes preference over `tag_name`

#### `tag_name`

Tag name of the release. Is ignored if `release_name` is informed

#### `owner`

Optional. Owner of the repository. Defaults to current owner.

#### `repo`

Optional. Name of the repository. Defaults to current repo.

#### `error-if-draft`

Optional. Action fails if release is still a draft. Defaults to false.

#### `error-if-not-draft`

Optional. Action fails if release is not a draft. Defaults to false.

#### `error-if-prerelease`

Optional. Action fails if release is a prerelease. Defaults to false.

#### `error-if-not-prerelease`

Optional. Action fails if release is not a prerelease. Defaults to false.

#### `error-if-not-found`

Optional. Action fails if release is not found. Defaults to false.

### Outputs

#### `id`

ID of the release

#### `name`

Name of the release

#### `tag_name`

Tag name of the release

#### `body`

Body of the release

#### `draft`

Whether the release is a draft

#### `prerelease`

Whether the release is a prerelease

#### `created_at`

Creation date of the release

#### `published_at`

Publication date of the release

#### `url`

URL of the release

#### `html_url`

HTML URL of the release

#### `assets_url`

URL of the release assets

#### `upload_url`

URL for uploading assets to the release

#### `tarball_url`

URL of the release tarball

#### `zipball_url`

URL of the release zipball

#### `node_id`

Node ID of the release

#### `author_login`

Login of the release author

#### `author_id`

ID of the release author

#### `author_node_id`

Node ID of the release author

#### `author_avatar_url`

Avatar URL of the release author

#### `author_html_url`

HTML URL of the release author

#### `author_followers_url`

URL of the followers of the release author

#### `author_following_url`

URL of the users followed by the release author

#### `author_gists_url`

URL of the gists created by the release author

#### `author_starred_url`

URL of the repositories starred by the release author

#### `author_subscriptions_url`

URL of the subscriptions of the release author

#### `author_organizations_url`

URL of the organizations the release author belongs to

#### `author_repos_url`

URL of the repositories owned by the release author

#### `author_events_url`

URL of the events performed by the release author

#### `author_received_events_url`

URL of the events received by the release author

#### `author_type`

Type of the release author

#### `author_site_admin`

Whether the release author is a site admin
