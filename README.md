<!-- PROJECT SHIELDS -->
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h1 align="center">Moose Bot</h1>

  <p align="center">
    A simple discord bot built with discord.js to track basic League of Legends related data for MooseRx and others
    <br />
    <a href="https://github.com/williammabernathy/Moose-Bot/issues">Report Bug</a>
    ·
    <a href="https://github.com/williammabernathy/Moose-Bot/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

A simple discord bot built as a learning project for node.js. This project is strictly designed for my personal discord server, but can somewhat easily be edited for any discord. While it revoles around the user MooseRx, it works for anyone, as per passed arguments, for any given command. 

### Built With

* [Node.js](https://nodejs.org/en/)
* [Discord.js](https://discord.js.org/#/)
* [Sequelize](https://sequelize.org/)



<!-- GETTING STARTED -->
## Getting Started

- Just a few simple steps to get the project running. <br>
- Find the list of command documentation [here](https://github.com/williammabernathy/Moose-Bot/tree/master/commands#commands).

### Prerequisites

Install/update npm:
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://developer.riotgames.com/](https://developer.riotgames.com/)
2. Clone the repo:
   ```sh
   git clone https://github.com/williammabernathy/Moose-Bot.git
   ```
3. Install NPM packages:
   ```sh
   npm install
   ```
4. Enter the following in a ***newly created folder in the same directory as this README*** `config.json`:
   ```json
   {
	    "prefix": "!",
	    "token": "DISCORD TOKEN HERE",
	    "riotToken": "RIOT API HERE",
	    "devs": [ "DISCORD USER ID 1", "DISCORD USER ID 2" ]
    }
   ```
   - **prefix**: the prefix used before a command. Ex. !into, !ping.
   - **token**: discord bot token.
   - **riotToken**: riot API token.
   - **devs**: discord ID of those with access to dev commands.

<!-- CONTRIBUTING -->
## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add something else to annoy Moose'`)
4. Push to the Branch (`git push origin feature/MooseAnnoyance`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

William Matthew Abernathy - matthew.abernathy123@gmail.com

Project Link: [https://loop-hero-randomizer.netlify.app/](https://loop-hero-randomizer.netlify.app/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/william-abernathy-b636a5199/