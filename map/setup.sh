#!/bin/bash

if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null
then
    echo "npm is not installed. Please install npm."
    exit 1
fi

echo "Installing project dependencies..."
npm install

npm install @react-google-maps/api

echo "Dependencies installed successfully."

echo "Starting development server..."
npm start
