#!/bin/bash

# usage: ./create-member.sh '<pekUsername>' '<realName>'

DIR=src/content/members

# checking args
if [ $# != 2 ]; then
    echo 'Error! Usage: ./create-member.sh "<pekUsername>" "<realName>"'
    exit -1
fi

# creating variables
pekusername=$1
realname=$2
joindate=`date +"%Y-%m"`
filename=$1'.md'
filepath=$DIR/$filename

# creating posttemplate
touch $filepath
echo '---' >> $filepath
echo 'layout: member' >> $filepath
echo 'pekUsername: '$pekusername >> $filepath
echo 'realName: "'$realname'"' >> $filepath
echo 'position: tag' >> $filepath
echo 'email: null' >> $filepath
echo 'joinDate: '$joindate >> $filepath
echo 'interests: ""' >> $filepath
echo 'featuredImage: null' >> $filepath
echo 'active: true' >> $filepath
echo '---' >> $filepath
