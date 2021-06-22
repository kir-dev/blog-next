#!/bin/bash

# usage: ./create-course.sh '<title>' '<lecturer>'

DIR=src/content/courses

# checking args
if [ $# != 2 ]; then
    echo 'Error! Usage: ./create-course.sh "<title>" "<lecturer>"'
    exit -1
fi

# creating variables
title=$1
lecturer=$2
escapedtitle=`echo $title | tr '[:upper:]' '[:lower:]' | sed -e 's/á/a/g;s/é/e/g;s/í/i/g;s/ó/o/g;s/ö/o/g;s/ő/o/g;s/ú/u/g;s/ü/u/g;s/ű/u/g;s/ /-/g'`
filename=$escapedtitle'.md'
filepath=$DIR/$filename

# creating posttemplate
touch $filepath
echo '---' >> $filepath
echo 'layout: course' >> $filepath
echo 'title: "'$title'"' >> $filepath
echo 'sessions: [{ date: "2021-06-21", startTime: "18:00:00", endTime: "20:00:00", place: "SCH 103" }]' >> $filepath
echo 'lecturer: "'$lecturer'"' >> $filepath
echo 'active: true' >> $filepath
echo '---' >> $filepath
