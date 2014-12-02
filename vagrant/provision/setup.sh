#!/bin/bash

# MARKER_FILE="/usr/local/etc/vagrant_provision_marker"
# # Only provision once
# if [ -f "${MARKER_FILE}" ]; then
# exit 0
# fi

# echo "Provisioning virtual machine..."
# apt-get update
# 
# echo "Installing basic dependencies"
# apt-get install build-essential bsdtar curl -y > /dev/null
#  
# echo "Installing Git"
# apt-get install git -y > /dev/null
# 
# # Automatically move into the shared folder, but only add the command
# # if it's not already there.
# # grep -q 'cd /vagrant' /home/vagrant/.bash_profile || echo 'cd /vagrant' >> /home/vagrant/.bash_profile
# 
# # Touch the marker file so we don't do this again
# touch ${MARKER_FILE}