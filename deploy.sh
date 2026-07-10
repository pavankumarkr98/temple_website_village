#!/bin/bash

# Configuration
PROJECT_DIR="/home/pavan/ReactProjects/AI-Portal"
SERVER="root@164.52.193.66"
REMOTE_PATH="/root"
WEB_DIR="/var/www/my-app"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting build and deployment process...${NC}"

# Step 1: Navigate to project directory
echo -e "${YELLOW}Step 1: Navigating to project directory...${NC}"
cd "$PROJECT_DIR" || {
    echo -e "${RED}Error: Cannot navigate to $PROJECT_DIR${NC}"
    exit 1
}

# Step 2: Run npm build
echo -e "${YELLOW}Step 2: Building React application...${NC}"
npm run build || {
    echo -e "${RED}Error: Build failed!${NC}"
    exit 1
}

# Step 3: Create zip file
echo -e "${YELLOW}Step 3: Creating deployment package...${NC}"
rm -f dist.zip
zip -r dist.zip dist/ || {
    echo -e "${RED}Error: Failed to create zip file${NC}"
    exit 1
}

# Step 4: Copy to server
echo -e "${YELLOW}Step 4: Uploading to server...${NC}"
scp dist.zip "$SERVER:$REMOTE_PATH/" || {
    echo -e "${RED}Error: Failed to upload file${NC}"
    exit 1
}

# Step 5: Deploy on server
echo -e "${YELLOW}Step 5: Deploying on server...${NC}"
ssh "$SERVER" "
    echo 'Removing old deployment...'
    rm -f $REMOTE_PATH/dist.zip
    rm -rf $REMOTE_PATH/dist/
    
    echo 'Extracting new build...'
    unzip -q $REMOTE_PATH/dist.zip -d $REMOTE_PATH/
    
    echo 'Deploying to web directory...'
    sudo rm -rf $WEB_DIR/*
    sudo cp -r $REMOTE_PATH/dist/* $WEB_DIR/
    sudo chown -R www-data:www-data $WEB_DIR
    sudo chmod -R 755 $WEB_DIR
    
    echo 'Cleaning up temporary files...'
    rm -f $REMOTE_PATH/dist.zip
    rm -rf $REMOTE_PATH/dist/
    
    echo 'Deployment completed!'
" || {
    echo -e "${RED}Error: Deployment failed${NC}"
    exit 1
}

# Step 6: Clean up local zip
echo -e "${YELLOW}Step 6: Cleaning up local files...${NC}"
rm -f dist.zip

echo -e "${GREEN}Build and deployment completed successfully!${NC}"
echo -e "${GREEN}Your React app is now live!${NC}"