#!/bin/bash

# usage: ./create-post.sh '<title>' '<author>'

DIR=src/content/posts

# checking args
if [ $# != 2 ]; then
    echo 'Error! Usage: ./create-post.sh "<title>" "<author>"'
    exit -1
fi

# creating variables
filenamedate=`date +"%Y-%m-%d"`
postdate=$filenamedate' '`date +"%H:%M:%S"`
title=$1
escapedtitle=`echo $title | tr '[:upper:]' '[:lower:]' | sed -e 's/á/a/g;s/é/e/g;s/í/i/g;s/ó/o/g;s/ö/o/g;s/ő/o/g;s/ú/u/g;s/ü/u/g;s/ű/u/g;s/ /-/g'`
author=$2
filename=$filenamedate'-'$escapedtitle'.md'
filepath=$DIR/$filename

# creating posttemplate
touch $filepath
echo '---' >> $filepath
echo 'layout: post' >> $filepath
echo 'author: '$author >> $filepath
echo 'date: '$postdate >> $filepath
echo 'title: "'$title'"' >> $filepath
echo 'lead: ""' >> $filepath
echo 'tags: []' >> $filepath
echo 'comment: true' >> $filepath
echo 'featuredImage: null' >> $filepath
echo '---' >> $filepath
