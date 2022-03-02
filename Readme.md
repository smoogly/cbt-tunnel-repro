# Reproducing tunnel issue with CrossBrowserTesting headless chrome

Execute `npm test` to reproduce the tunnel issue.

First, a test is executed against Chrome on Windows 10 — that one is expected to succeed.  
Second, same test is executed against Chrome on Ubuntu — that one times out.

See the video recordings of the session runs for confirmation at https://app.crossbrowsertesting.com/selenium/results

## Credentials

To run the test, create a `.env` file at the root of the project
by copying `.env.template` and specifying the credentials.


## Example run log

```
292AB6| Running serve -l 8000 ./static
4092BF| Running rm -f ./tunnel_ready
4092BF| Completed rm -f ./tunnel_ready in 10ms
787699| Running ./tunnel/SBSecureTunnel_mac --username <login> --authkey <password> --ready ./tunnel_ready --quiet
292AB6| Started serve -l 8000 ./static in 269ms
787699| Started ./tunnel/SBSecureTunnel_mac --username <login> --authkey <password> --ready ./tunnel_ready --quiet in 2.5s
19193C| Running node selenium.js win
19193C| Obtaining session
19193C| See your test run at: https://app.crossbrowsertesting.com/selenium/d4426c606c4610936c3766e820538610
19193C| Connecting to local url: http://192.168.200.53:8000
19193C| Still trying to connect to http://192.168.200.53:8000 for 1 seconds
19193C| Quitting
19193C| Done
19193C| Completed node selenium.js win in 15.4s
85031E| Running node selenium.js headless
85031E| Started node selenium.js headless in 6ms
85031E| Obtaining session
85031E| See your test run at: https://app.crossbrowsertesting.com/selenium/dd308dec62408f9bdfda73ac0b04e330
85031E| Connecting to local url: http://192.168.200.53:8000
85031E| Still trying to connect to http://192.168.200.53:8000 for 10 seconds
85031E| Still trying to connect to http://192.168.200.53:8000 for 20 seconds
85031E| Still trying to connect to http://192.168.200.53:8000 for 30 seconds
85031E| Still trying to connect to http://192.168.200.53:8000 for 40 seconds
85031E| Still trying to connect to http://192.168.200.53:8000 for 50 seconds
85031E| Still trying to connect to http://192.168.200.53:8000 for 60 seconds
85031E| Still trying to connect to http://192.168.200.53:8000 for 70 seconds
85031E| Still trying to connect to http://192.168.200.53:8000 for 80 seconds
85031E| Still trying to connect to http://192.168.200.53:8000 for 90 seconds
85031E| Still trying to connect to http://192.168.200.53:8000 for 100 seconds
85031E| Quitting
85031E| Error: Failed to connect
85031E|     at /Users/arseny/Desktop/Projects/cbt-tunnel-repro/selenium.js:56:15
85031E|     at processTicksAndRejections (node:internal/process/task_queues:96:5)
85031E| Failed node selenium.js headless
```
