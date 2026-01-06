# GitHub - delete all commit history
`Apr 20, 2024`

## Pre-step A: If not generated a ssh public/private key pair set before
`cd ~/.ssh && ssh-keygen`

Next you need to copy this to your clipboard.

On macOS run: `cat id_rsa.pub | pbcopy`

Add your key to your account via the GitHub website.

Settings of the repository → Deploy keys → Add deploy key

Finally setup your .gitconfig.

`git config --global user.name "github_username"`

Restart command line to make sure the config is reloaded.

## Pre-step B: Clone the repository locally
(skip if you already have a local clone)

`cd ~`

`git clone git@github.com:github_username/repository_name`

## Steps

Step 1: Check out to a temporary branch

`cd "repository_name"`

`git checkout --orphan temp_branch`

Step 2: Add all files

`git add -A`

Step 3: Commit the changes

`git commit -m "Initial commit"`

Step 4: Delete the main branch

`git branch -D main`

Step 5: Rename the temporary branch to main

`git branch -m main`

Step 6: Force update to the repository

`git push --force origin main`

## Sources and references
- [Deleting Your Commit History?](https://xebia.com/blog/deleting-your-commit-history/)
- [Git: How to solve Permission denied (publickey) error when using Git?](https://stackoverflow.com/questions/2643502/git-how-to-solve-permission-denied-publickey-error-when-using-git)
- [Adding a new SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
- [GitHub - Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
