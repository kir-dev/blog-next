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
filename=$escapedtitle'.yaml'
filepath=$DIR/$filename

# creating coursetemplate
touch $filepath
echo 'title: '$title >> $filepath
# Order is a 3 digit number
echo 'order: 900' >> $filepath
echo 'sessions:' >> $filepath
echo '  - startDate: 2021-02-25' >> $filepath
echo '    startTime: "18:00"' >> $filepath
echo '    endTime: "20:00"' >> $filepath
echo '    place: SCH 103' >> $filepath
echo '  - startDate: 2021-03-04' >> $filepath
echo '    startTime: "18:00"' >> $filepath
echo '    endTime: "20:00"' >> $filepath
echo '    place: SCH 103' >> $filepath
echo 'lecturer: '$lecturer >> $filepath
echo 'active: true' >> $filepath
echo 'description: >' >> $filepath
echo '  Multiline description here' >> $filepath
