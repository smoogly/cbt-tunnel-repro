# Reproducing tunnel issue with CrossBrowserTesting headless chrome

Execute `npm test` to reproduce the tunnel issue.

First, a test is executed against Chrome on Windows 10 — that one is expected to succeed.  
Second, same test is executed against Chrome on Ubuntu — that one times out.

See the video recordings of the session runs for confirmation at https://app.crossbrowsertesting.com/selenium/results

## Credentials

To run the test, create a `.env` file at the root of the project
by copying `.env.template` and specifying the credentials.
