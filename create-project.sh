#!/bin/bash

# usage: ./create-project.sh '<urlpath>' '<title>'

DIR=src/content/projects

# checking args
if [ $# != 2 ]; then
    echo 'Error! Usage: ./create-post.sh "<urlpath>" "<title>"'
    exit -1
fi

# creating variables
title=$2
urlpath=$1
filename=$1'.md'
filepath=$DIR/$filename

# creating posttemplate
touch $filepath
echo '---' >> $filepath
echo 'layout: project' >> $filepath
echo 'title: '$title >> $filepath
echo 'lead:' >> $filepath
echo 'github: https://github.com/kir-dev/'$urlpath >> $filepath
echo 'website: https://< enter >.sch.bme.hu/' >> $filepath
echo 'status:' >> $filepath
echo '  label: Aktív' >> $filepath
echo '  color: green' >> $filepath
echo 'techs:' >> $filepath
echo '  - Node' >> $filepath
echo 'featuredImage:' >> $filepath
echo '---' >> $filepath
