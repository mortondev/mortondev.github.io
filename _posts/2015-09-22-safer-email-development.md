---
layout: post
title: Safer Email Development With MailCatcher
---

Having worked on a number of applications which send lots of emails to customers, one thing that has always concerned me is the risk of accidentally sending emails to customers.

After a quick search I came across a great little gem called [MailCatcher](http://mailcatcher.me).

Mailcatcher creates a local SMTP server which can be used for development purposes. It simply stores emails in memory and displays them in a web interface, which is great for testing email delivery and content.

The benefit of using a local SMTP server instead of having a test mode redirecting emails to a different address is that there are no code differences between development and production. I can also be confident that while developing email related code on my machine that I'm not about to accidentally send emails out.

## Prerequisites

To use MailCatcher you must have ruby installed.

### Linux

You can find instructions for installing Ruby on Linux on the [official Ruby website](https://www.ruby-lang.org/en/documentation/installation).

### Windows

Installing Ruby on Windows is thankfully a simple task thanks to [Ruby Installer](http://rubyinstaller.org). You will need to use the Ruby Installer and also install the Ruby Development Kit (see the [download page](http://rubyinstaller.org/downloads) for information).

## How to install MailCatcher

Assuming you have Ruby installed, you can install the mailcatcher gem by running:

```sh
gem install mailcatcher
```

## Capturing Emails with MailCatcher

You can start the MailCatcher server using:

```sh
mailcatcher
```

Next step (very important) is make sure your application is configured to use your local SMTP server (running at localhost on port 1025).

You can you can view all sent emails by visiting [localhost:1080](http://localhost:1080).
