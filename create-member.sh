#!/bin/bash

# usage: ./create-member.sh '<pekUsername>' '<realName>' '<position>'

DIR=src/content/members

# checking args
if [ $# != 3 ]; then
    echo 'Error! Usage: ./create-member.sh "<pekUsername>" "<realName>" "<position>"'
    exit -1
fi

# creating variables
pekusername=$1
realname=$2
position=$3
joindate=`date +"%Y-%m"`
filename=$1'.md'
filepath=$DIR/$filename

# creating posttemplate
touch $filepath
echo '---' >> $filepath
echo 'layout: member' >> $filepath
echo 'pekUsername: '$pekusername >> $filepath
echo 'realName: "'$realname'"' >> $filepath
echo 'position: "'$position'"' >> $filepath
echo 'joinDate: '$joindate >> $filepath
echo 'interests: []' >> $filepath
echo 'featuredImage: ../images/avatars/'$pekusername'.jpg' >> $filepath
echo 'active: true' >> $filepath
echo '---' >> $filepath
