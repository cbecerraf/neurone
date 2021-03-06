#!/bin/bash

set -u
set -e

HOMEDIR=$(pwd)

printf "%b\n" "\e[1;92m>> Installing Meteor Framework [1/8]\e[0m"

# Download installer script
curl https://install.meteor.com -o /tmp/install_meteor.sh

# Change tar command in the install script with bsdtar ( bsdtar -xf "$TARBALL_FILE" -C "$INSTALL_TMPDIR" )
# Fixes https://github.com/meteor/meteor/issues/5762
sed -i.bak "s/tar -xzf.*/bsdtar -xf \"\$TARBALL_FILE\" -C \"\$INSTALL_TMPDIR\"/g" /tmp/install_meteor.sh

# Install Meteor
sh /tmp/install_meteor.sh

printf "%b\n" "\e[1;92m>> Packaging NPM dependencies [2/8]\e[0m"

(cd $HOMEDIR/src && meteor npm install --quiet)

printf "%b\n" "\e[1;92m>> Building Meteor app as Node.js app [3/8]\e[0m"
printf "%b\n" "\e[1;92m(this might take a lot of CPU, RAM and time)\e[0m"

(cd $HOMEDIR/src && meteor build ../neurone --directory --server-only)

printf "%b\n" "\e[1;92m>> Moving app to ~/neurone [4/8]\e[0m"

cp -r $HOMEDIR/neurone/bundle/. $HOMEDIR/neurone
rm -rf $HOMEDIR/neurone/bundle

printf "%b\n" "\e[1;92m>> Installing NPM dependencies [5/8]\e[0m"

(cd $HOMEDIR/neurone/programs/server && npm install --production --quiet)

printf "%b\n" "\e[1;92m>> Removing source code files [6/8]\e[0m"

rm -rf $HOMEDIR/src 

printf "%b\n" "\e[1;92m>> Removing Meteor Framework [7/8]\e[0m"

rm -rf $HOME/.meteor

printf "%b\n" "\e[1;92m>> NEURONE app is packaged and ready to run! [8/8]\e[0m"

set +u
set +e