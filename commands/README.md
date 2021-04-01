# Commands

```
!ping
```
- simply "pings" the bot. Expected reponse: "Pong! I can hear you!"
```
!intro
```
- displays embedded message with the introduction for Moose Bot
```
!commands
```
- displays a simple list of important commands, including arguments and constraints
```
!help
```
- pings Igifoshifo (me) requesting help. 
- links the issues tab for this repository
```
!cannon
```
- keeps a running track of how many cannons MooseRx has missed
- constraints:
1. Moose must be in game on one of his accounts
2. 10 second cooldown to both prevent trolling and multiple people calling this command at the same time resulting in incrementing the count multiple times
```
!opgg <optional: league of legends username>
```
- links to the specified users opgg account
- if left blank, links Moose's accounts
- Ex: !opgg Igifoshifo, !opgg K7 Moose
```
!rank <optional: league of legends username>
```
- displays the specified user's current ranked solo/duo 5v5 rank
- if left blank, displays MooseRx's rank
- Ex: !rank Igifoshifo, !rank K7 Moose
```
!mastery <optional: league of legends username>
```
- displays the specified user's highest 15 champion masteries
- if left blank, displays MooseRx's masteries
- Ex: !mastery Igifoshifo, !mastery K7 Moose
```
!history
```
- displays the specified user's most recent 5 games
- if left blank, displays MooseRx's most recent 5 games
- Ex: !history Igifoshifo, !history K7 Moose
<br><br>
## Dev commands
```
!dev cannon <postive integer>
```
- sets the cannon count as tracked by the !cannon command to the specified amount
```
!dev flush
```
- flushes the api cache. 
- can be used to reset api calls that are held for large amounts of time when changes are made to the game.
- Ex: A new champion was added and isn't showing up in !history call
- **NOTE: THIS *WILL* INCREASE LOAD TIMES**
<br><br>
## Other
```
!daddy
```
- T1 is life
