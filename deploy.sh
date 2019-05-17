#!/usr/bin/env sh

set -e

yarn build
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:guanpengchn/nice-notes.git master:gh-pages

cd -