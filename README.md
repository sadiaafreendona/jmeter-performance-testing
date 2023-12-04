# Content

- [Load testing Report](https://github.com/sadiaafreendona/jmeter-performance-testing#load-testing-report)
- [Load testing Report](https://github.com/sadiaafreendona/jmeter-performance-testing#Summary)
- [Introduction](https://github.com/sadiaafreendona/jmeter-performance-testing#introduction)  
- [Install](https://github.com/sadiaafreendona/jmeter-performance-testing#install)      
- [Prerequisites](https://github.com/sadiaafreendona/jmeter-performance-testing#prerequisites)
- [Elements of a Minimal Test Plan](https://github.com/sadiaafreendona/jmeter-performance-testing#Elements-of-a-minimal-test-plan)    
- [Test Plan](https://github.com/sadiaafreendona/jmeter-performance-testing#test-plan)
- [Collection of API](https://github.com/sadiaafreendona/jmeter-performance-testing#collection-of-api)   
    - [List of API](https://github.com/sadiaafreendona/jmeter-performance-testing#list-of-api) 
    - [Load the JMeter Script](https://github.com/sadiaafreendona/jmeter-performance-testing#load-the-jmeter-script)
- [Make jtl File](https://github.com/sadiaafreendona/jmeter-performance-testing#make-jtl-file)  
- [Make html File](https://github.com/sadiaafreendona/jmeter-performance-testing#make-html-file)  
- [HTML Report](https://github.com/sadiaafreendona/jmeter-performance-testing#html-report) 

# Load testing Report
| Concurrent Request  | Loop Count | Avg TPS for Total Samples  | Error Rate | Total Concurrent API request |
|               :---: |      :---: |                      :---: |                        :---: |      :---: |
| 200  | 1  | 0.72  | 0%      | 800   |
| 300  | 1  |  0.88     | 0%      | 1200   |
| 310  | 1  |  0.90    | 0%   | 1240   |




### Summary
- While executed 320 concurrent requests, it shows errors but cmd prompt fails to show all results due to server error !
- Summary: Server can handle almost concurrent 310 API call with almost zero (0) error rate.

  
# Introduction

This document explains how to run a performance test with JMeter against banglapuzzle.com

# Install

**Java**  
https://www.oracle.com/java/technologies/downloads/

**JMeter**  
https://jmeter.apache.org/download_jmeter.cgi  

Click =>Binaries    
=>**apache-jmeter-5.6.2.zip**

**We use BlazeMeter to generate JMX files**    
https://chrome.google.com/webstore/detail/blazemeter-the-continuous/mbopgmdnpcbohhpnfglgohlbhfongabi?hl=en

# Prerequisites
- As of JMeter 5.6, Java 8 and above are supported.
- we suggest  multicore cpus with 4 or more cores.
- Memory 16GB RAM is a good value.


# Elements of a minimal test plan
- Thread Group

   The root element of every test plan. Simulates the (concurrent) users and then run all requests. Each thread simulates a single user.

- HTTP Request Default (Configuration Element)

- HTTP Request (Sampler)

- Summary Report (Listener)

# Test Plan

Testplan > Add > Threads (Users) > Thread Group (this might vary dependent on the jMeter version you are using)

- Name: Users
- Number of Threads (users): 200 to 310
- Ramp-Up Period (in seconds): 1
- Loop Count: 1

  1) The general setting for the tests execution, such as whether Thread Groups will run simultaneously or sequentially, is specified in the item called Test Plan.

  2) All HTTP Requests will use some default settings from the HTTP Request, such as the Server IP, Port Number, and Content-Encoding.

  3) Each Thread Group specifies how the HTTP Requests should be carried out. To determine how many concurrent "users" will be simulated, one must first know the number of threads. The number of actions each "user" will perform is determined by the loop count.

  4) The HTTP Header Manager, which allows you to provide the Request Headers that will be utilized by the upcoming HTTP Requests, is the first item in Thread Groups.

# Collection of API

- Run BlazeMeter  
- Collect Frequently used API  
- Save JMX file then paste => **apache-jmeter-5.6.2\bin**

    ### List of API 

    - [https://www.banglapuzzle.com/](https://www.banglapuzzle.com/)
    - [https://www.banglapuzzle.com/products](https://www.banglapuzzle.com/products)
    - [https://www.banglapuzzle.com/about](https://www.banglapuzzle.com/about)
    - [https://www.banglapuzzle.com/contact](https://www.banglapuzzle.com/contact)

   **OR**
    
  ### Load the JMeter Script 
   - File > Open (CTRL + O)
   - Locate the "bangla_puzzle_200.jmx" file contained on this repo
   - Continue open bangla_puzzle_200.jmx to bangla_puzzle_310.jmx
   - Open those file
   - The Test Plan will be loaded
    ![jmeter](https://github.com/sadiaafreendona/jmeter-performance-testing/assets/118355066/8cd8f56e-e815-4537-bcab-091cb33af0b5)




# Test execution (from the Terminal)
 
- JMeter should be initialized in non-GUI mode.
- Make a report folder in the **bin** folder.  
- Run Command in __jmeter\bin__ folder.

 ### Make jtl file

```cmd prompt
  jmeter -n -t  bangla_puzzle_200.jmx -l bangla_puzzle_200.jtl
```      
  Then continue to upgrade Threads(200 to 310) by keeping Ramp-up Same.   

After completing this command  
   ### Make html file   
  
  ```cmd prompt
  jmeter -g report\bangla_puzzle_200.jtl -o bangla_puzzle_200.html
```
  - **g**: jtl results file

  - **o**: path to output folder
  - \
    ![folder](https://github.com/sadiaafreendona/jmeter-performance-testing/assets/118355066/b26b7db7-2100-49a4-b449-b520ee9b425c)
    ![Screenshot](https://github.com/sadiaafreendona/jmeter-performance-testing/assets/118355066/275f0edd-81e1-4790-b426-483e3fffe02f)


      



# HTML Report

**Number of Threads 200 ; Ramp-Up Period 1s**

Requests Summary             |  Errors
:-------------------------:|:-------------------------:
![1](https://github.com/sadiaafreendona/jmeter-performance-testing/assets/118355066/e4b8095c-0fb5-4cfc-807a-1697ac226da9) | ![2](https://github.com/sadiaafreendona/jmeter-performance-testing/assets/118355066/cb457517-97c5-4489-83a3-7b7c9b313b4b)



**Number of Threads 300 ; Ramp-Up Period 1s**
   
Requests Summary             |  Errors
:-------------------------:|:-------------------------:
![3](https://github.com/sadiaafreendona/jmeter-performance-testing/assets/118355066/05ebdd49-18c2-4237-907b-fafefd6a6eac) | ![4](https://github.com/sadiaafreendona/jmeter-performance-testing/assets/118355066/3f053be3-6f49-4cd1-94bf-ddc7e83e8ba4)



**Number of Threads 310 ; Ramp-Up Period 1s**
   
Requests Summary             |  Errors
:-------------------------:|:-------------------------:
![5](https://github.com/sadiaafreendona/jmeter-performance-testing/assets/118355066/33ff1140-9147-47c8-ba9d-b07fc52bc651) | ![6](https://github.com/sadiaafreendona/jmeter-performance-testing/assets/118355066/fd0467be-7fc0-4e0c-bb82-4e77135f0144)


