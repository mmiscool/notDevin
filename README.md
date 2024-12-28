# **This project is being discontinued in favor of focusing efforts on a different tool I made that dose the same thing but works with preexisting files https://github.com/mmiscool/aiCoder ** 
https://github.com/mmiscool/aiCoder
.
.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.




# notDevin
## An attempt at building an AI software developer. 
Initial goal is for this tool to be capable of generating a library implementing a BREP CAD kernel from scratch using javascript.

This is a highly complex task and while I might understand the concepts of how a BREP kernel is expected to function I lack the advanced mathematical education foundation required to take on such a task. It is my hope that advanced algorithms were used in the datasets available using locally hosted models via ollama include the required patterns to combine in to a functional library.

If it is possible to accomplish this benchmark task I would expect it to be useful to replicate the core functionality of other proprietary industry standard foundational components. It could possibly be used as a standalone development system that seeks out experts in the field to contribute their advanced knowledge of algorithms to collectively provide the prompts for code generation. 


I encourage any one capable of attempting the challenge to make a go of it. There will be a general specification for what is expected from a BREP kernel and an overview of the major components that are required to form a functional BREP kernel. The BREP kernels today represent more than 10,000 years of collective developer time dedicated to bring them in to existence with thousands of people actively being employed to develop starting in the 1970s and continuing to this very day. If an AI tool can accomplish this task surely it is ready for prime time use. This particular challenge should be obtainable with in the next few years. 




In my own personal attempt at hitting this benchmark I am using the following guiding principals in the approach. 
# Goals for this particular AI developer system:
* All code should be machine generated from prompts.
    * Each individual function will have its own specification in the requirements system. 
    * Each function will be tested for syntax correctness automatically and attempt to self correct. 
    * Functions will be grouped in to classes based on what component from the specification it falls under.
* A planning agent is capable of generating prompts to initialize creation of individual functions. 
    * Planing agent would interpret the specification and break down the task in to a list of functions.
    * Each function would need to have a specification generated for it. 
    
* A build system with assemble each discreet function in to the finished library. 
    * Build system will be completely automated.
    * exports and imports are managed at build time and automatically generated.
    * Documentation about each function is embedded in to the final compiled version of the library in addition to a navigable collection of markdown files that document the library. 
    * Additional to be determined testing 


Hopefully this highly structured approach bears fruit. Using a customized build system automatically managing imports between files with individually validated single functions as the building blocks should guarantee no syntax errors at build time. Coupling this with a complete history of each function specification and prompt execution engaging automatically generated videos could be created showing the conversation between bots in the system and users updating the specifications. Every function has a story to tell from initial formation to modification to handle specific problems or missing functionality. 



# Current state of this notDevin tool:
This tool currently can construct individual functions. 

Each function has its own specification. That specification can be input by the user. 
It can generate code based on the specification. 

After it generates the code the function is stored along with the specification used to generate it. 
Specifications can be modified and the individual functions can be regenerated. 

The tool is also capable of testing if the syntax of the function is valid and report if the code is not valid.
Error logs can be then fed back in along with the specification prompt and the current function code to correct the problem.
