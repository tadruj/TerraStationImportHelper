# Importing LUNC or LUNA address to Terra Station Wallet with address and private key

## You have

your native Terra LUNC or LUNA Blockchain Address and Private Key from Exodus or other wallet

## You want to

import the blockchain address to Terra Station or Terra Station Mobile wallet

# Solution

This code is based on https://github.com/terra-money/station Terra Station Wallet.

Terra Station doesn't support importing blockchain address with a plaintext private key

It offers "Import wallet" option with "Key" and "Password" fields

In the "Key" field it expects Base64 encoded {"name", "address", "private_key"} hash with AES encrypted private key with PBKDF2 salted password.

# Required information

Native Terra network Blockchain address - something starting with terra1...

Private key - 64 characters long, containing only hexadecimal characters (0-9 & a..f)

# Prerequisites

To use this solution you'll need to run in on your own computer and have some script kiddy skills.

Don't send or paste keys to any web pages or apps outside of your computer terminal!

Install Node from https://nodejs.org/ and optionally install brew from https://brew.sh/

# Running

    brew install node

edit index.js file with your blockchain_address, private_key and new_import_password

    npm install
    npm run start

This will output Terra Station compatible "Key" and "Password" fields for "Import Wallet" option in Terra Station

# Rebuilding

    brew install typescript
    brew install esbuild

edit index.ts

    npm run build

# Delete

When done importing delete this software so you don't have your private keys lying around in random files on your computer.

# Disclaimers

* I tested this on Mac OSX. Linux and other platforms might require minor tweaks that your neighbor script kiddy probably can help you with.
* Make sure you have fresh installation of Terra Station application. Terra Station application likes to freeze completely.
* Don't try this in Terra Station where you have other wallets connected containing money. Terra Station application likes to freeze completely.
* Make sure to review this code before you run it, don't trust me, maybe my computer or git repo has been compromised.
* I am not responsible for any loss or theft of funds!!! or private keys!!!

# Possible issues

In case you enter a wrong Terra network address, Terra Station application will lock.

Uninstalling and installing application won't help.

Terra Station electron app temporary directory on Mac OSX is "~/Library/Application Support/station-electron/"

You will need to close the application and remove its temporary directory

    rm -rf "~/Library/Application Support/station-electron/"

And then start the application again.

Again, make sure you don't have any funds on your Terra Station wallet.
