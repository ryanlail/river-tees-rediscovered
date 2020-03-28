-- phpMyAdmin SQL Dump
-- version 4.0.10.17
-- https://www.phpmyadmin.net
--
-- Host: mysql.dur.ac.uk
-- Generation Time: Mar 28, 2020 at 03:29 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `Cpvzm85_RTR`
--

-- --------------------------------------------------------

--
-- Table structure for table `Artist`
--

CREATE TABLE IF NOT EXISTS `Artist` (
  `ArtistID` int(11) NOT NULL,
  `Forename` varchar(64) DEFAULT NULL,
  `Surname` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`ArtistID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Artist`
--

INSERT INTO `Artist` (`ArtistID`, `Forename`, `Surname`) VALUES
(1, 'Russ', 'Coleman'),
(2, 'infinite...', ''),
(3, 'Steve', 'Tomlinson'),
(4, 'Andrew', 'McKeown'),
(5, 'Pat', 'Walls');

-- --------------------------------------------------------

--
-- Table structure for table `PassportPage`
--

CREATE TABLE IF NOT EXISTS `PassportPage` (
  `UserID` varchar(255) NOT NULL,
  `SculptureID` int(25) NOT NULL,
  `PhotoPath` varchar(512) NOT NULL,
  PRIMARY KEY (`UserID`,`SculptureID`),
  KEY `SculptureID` (`SculptureID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Sculpture`
--

CREATE TABLE IF NOT EXISTS `Sculpture` (
  `SculptureID` int(25) NOT NULL,
  `Title` varchar(128) NOT NULL,
  `Description` text NOT NULL,
  `LatitudeLongitude` varchar(32) NOT NULL,
  `ArtistID` int(11) NOT NULL,
  `TrailID` int(11) NOT NULL,
  PRIMARY KEY (`SculptureID`),
  KEY `ArtistID` (`ArtistID`),
  KEY `TrailID` (`TrailID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Sculpture`
--

INSERT INTO `Sculpture` (`SculptureID`, `Title`, `Description`, `LatitudeLongitude`, `ArtistID`, `TrailID`) VALUES
(1, 'Piercebridge Community Garden', 'Sourcing part of the landscape then sculpting it and reframing it so it tells the story of this place. \r\nThis island was sculpted during the ice age. But when the planet warmed so the receding glaciers left erratics. Stones from another place carried along in the ice. Ancient time travellers that helped shape this place. \r\nThe artist’s approach was to visit each site and source these stones then sculp and polish them so their true beauty is revealed. \r\nEvery one will be unique with different textures and forms and each will be set on its own individual polished concrete plinth.', '54.535184 -1.6757089', 1, 1),
(2, 'Broken Scar', 'A tower of interlocking planes Cascade is inspired by how man controls the river at this location. The forms and shapes are designed to echo water falling down the weir. Each plane has flowing lines and forms carved into them with random different sized cut-out circles to representing the foam formed as water enters pools below.\r\nStaron is a mineral-based synthetic material that is as robust as natural stone yet has the smooth finish of alabaster.''Dazzling white'' when installed the different facets of each piece will subtly change colour as natural lighting conditions change throughout the day.', '54.517334 -1.6000805', 2, 1),
(3, 'Adjacent South Park - Riverbank South of Parkside', 'Reflecting the leisure and fun of the park, a ‘Musical Instrument Dragonfly’ (in reference to the bandstand) in acid etch steel at 1.5m high.\r\nThe 1.5m high work will be made from Corten steel It will form its own oxide coating over the first few weeks, changing colour from steel to orange and then finally to brown.\r\nThe dragonfly rests on a horn-like shape (with inset blocked end). The feet are forged ‘musical notes’. The body consists of pipes (with inset blockings). The body is like a tin whistle - again any holes suggested are blocked from the inside. Both wings (only nearest one shown for clarity) are mainly tubing (some tapered) with ‘valves’ and trumpet-like', '54.513406 -1.5633883', 3, 1),
(4, 'Hurworth', 'CURRENTLY UNDER REVIEW', '54.483919 -1.5533146', 4, 1),
(5, 'The Front, Middleton One Row', 'This piece will be quiet and reflective. This will be achieved through use of scale as well as the naturally flowing curves within the design.\r\nThe arc form represents the meanders of the river and the movement of water. The carving will use the qualities of the material to exaggerate this, with a contrast between rough and polished surfaces.\r\nThe material, Ancaster Weatherbed limestone, is a dense hardwearing limestone from Lincolnshire that takes a polish. It also has the strength to support the form. The colour is a mix of blue grey and dusty pink bands with rich fossil content.\r\nThe plinth will contrast the sculpture.', '54.504449 -1.4576397', 5, 1),
(6, 'Aislaby Village Green', 'This location is something of a rural oasis along the trail, and there is a requirement for seating. My proposal for this location is to create a ''Leaf- Otter'' seat.\r\nThe work will be fabricated in acid etched galvanised steel. The work would be 780mm high at the tail tip and 1850mm long (if straight). The work will be concreted into the ground, with an additional concrete layer to keep grass away and to cope with the sloping/uneven ground.\r\nElevation of the Leaf Otter (straightened out), but will be slightly curved in plan for a better form. The seat area (shown in plan above the side view) will be 450mm from the ground to allow 2 people (both adults and children) to sit upon it and will a slight ‘pitch'' to allow water to drain off.', '54.503869 -1.3729142', 3, 2),
(7, 'Stoney Bank, Egglescliffe', 'CURRENTLY UNDER REVIEW', '54.512179 -1.3553024', 4, 2),
(8, 'Bowesfield and Preston Farm Nature Reserve', 'Sourcing part of the landscape then sculpting it and reframing it so it tells the story of this place.\r\nThis island was sculpted during the ice age. But when the planet warmed so the receding glaciers left erratics. Stones from another place carried along in the ice. Ancient time travellers that helped shape this place.\r\nThe artist’s approach was to visit each site and source these stones then sculp and polish them so their true beauty is revealed.\r\nEvery one will be unique with different textures and forms and this one will be set on its own individual polished concrete bench.', '54.535484 -1.3129917', 1, 2),
(9, 'Ingleby Wood', 'The design for the sculpture represents the three rivers/ waterways that surround Ingleby Barwick; the River Tees, the River Leven and Bassleton Beck.\r\nThe circle of the design represents the three rivers, each as one of the intersecting facets. The circle is made from a looped equilateral triangle section rotated three times within 360 degrees, like a Toblerone twisted and made into a circle.\r\nThe stone would be Fletcher Bank gritstone, richly textured sandstone from the Pennines, the plinth would be made from the same stone. The dimensions would have a combined height of 1500mm.', '54.517264 -1.3014800', 5, 2),
(10, 'Relict Salt Marsh, Stainsby Beck', 'This installation of interlocking organic forms is inspired by how nature has reclaimed and ''rewilded'' this location. The forms and shapes echo the curve of the meandering waterway as well as the natural growth of local plant life. Each plane has flowing lines and forms carved into as well as simplified leaf and appropriate bird form cut-outs representing this natural habitat.\r\nStaron is a mineral-based synthetic material that is as robust as natural stone yet has the smooth finish of alabaster.''Dazzling white'' when installed the different facets of each piece will subtly change colour as natural lighting conditions change throughout the day.', '54.551938 -1.2759186', 2, 2),
(11, 'Blue Bell Beck', 'Sourcing part of the landscape then sculpting it and reframing it so it tells the story of this place.\r\nThis island was sculpted during the ice age. But when the planet warmed so the receding glaciers left erratics. Stones from another place carried along in the ice. Ancient time travellers that helped shape this place.\r\nThe artist’s approach was to visit each site and source these stones then sculp and polish them so their true beauty is revealed.\r\nEvery one will be unique with different textures and forms and this one will be set on its own individual polished concrete bench.', '54.541377 -1.2682380', 1, 3),
(12, 'Maze Park', 'CURRENTLY UNDER REVIEW', '54.566780 -1.2705982', 4, 3),
(13, 'Iron Masters Trail', 'Reflecting old and new stories, this corten steel seal reflects upon the former shipbuilding heritage of the river, and how the river is cleaner, encouraging the seals to return.\r\nThe 1.3m high work will be fabricated in 4mm corten sheet with a gusset/brace along the two upright edges for stability. There will be a small ‘baseplate’ around the spine.', '54.582807 -1.2577639', 3, 3),
(14, 'Teessarus Park', '''Giants Forged Here'' is an egg-shaped installation made up of curved interlocking white planes. Inspired by the huge offshore structures built on the other side of the river. Each plane of the form is carved with curved lines representing river water and the straight lines representing the huge engineered steel structures. While the overall egg shape playfully ties-in with the park’s other residents – the dinosaurs!\r\nStaron is a mineral-based synthetic material that is as robust as natural stone yet has the smooth finish of alabaster.''Dazzling white'' when installed the different facets of each piece will subtly change colour as natural lighting conditions change throughout the day.', '54.590080 -1.2479441', 2, 3),
(15, 'Viewing Platform adjacent to Transporter Bridge', 'The design for the sculpture is based on a triangle as the bridge is a massive series of triangles. The sculpture is also a continuous loop representing the connection made between the North and South banks of the river.\r\nI would like to use Kilkenny limestone as the material. It''s an Irish blue/ black limestone. Firstly it''s strong enough to support the design; secondly it has a beautiful colour to it.\r\nThe curves would naturally have more weight in the lower areas of the sculpture, becoming lighter in the upper parts. It would keep strength throughout with the flowing arched form and the width of the curves. There would be a contrast between the chiselled edges and the smooth polish inside the curves.', '54.584090 -1.2301057', 5, 3),
(16, 'Saltern Wetlands - Greatham Creek', 'Sourcing part of the landscape then sculpting it and reframing it so it tells the story of this place.\r\nThis island was sculpted during the ice age. But when the planet warmed so the receding glaciers left erratics. Stones from another place carried along in the ice. Ancient time travellers that helped shape this place.\r\nThe artist’s approach was to visit each site and source these stones then sculp and polish them so their true beauty is revealed.\r\nEvery one will be unique with different textures and forms and this one will be set on its own individual polished concrete bench.', '54.622683 -1.2124339', 1, 4),
(17, 'Saltern Wetlands', 'I love the openness of this site, the long distance views and the incredible horizon of dominant industrial shapes. The shape of the sculpture is a response to the surroundings. The edges will appear sharp from a distance but would actually be gently rounded and thick enough to make it very strong.\r\nThe plinth will be curved in a concave form to correspond with the large disc of the sculpture, to allow for the circle to remain continuous and yet still provide a very strong footing and hidden fixings.\r\nThe material suggested; Hillhouse Edge sandstone from the Pennines, is available in blocks sufficiently large to create such a sculpture and is very hardwearing. ', '54.627394 -1.2112586', 5, 4),
(18, 'Salt Marshes, Cerebos Salt', 'CURRENTLY UNDER REVIEW', '54.633235 -1.2264824', 4, 4),
(19, 'Greatham Beck - Greatham Parish', 'This installation consists of a tower of planes shaped into organic forms that curve and undulate ending in a point. The shapes are smooth and thin and are inspired by the slow running beck, the ancient woodland and arable crops found at this location. Smooth undulating lines are carved into each of the planes echoing flowing water, the branches of trees and the ears of wheat and barley.', '54.638082 -1.2411713', 2, 4),
(20, 'Seaton Common National Nature Reserve Saltern', 'This corten ‘Tidal Curlew’ reflects upon how local industry and nature live side by side in its design and material construction. The curlew has been chosen to symbolise the birds that call this tidal location ‘home’ which also next to a heavy industrial area.\r\nCorten steel requires no maintenance at all. It forms its own oxide coating over the first few weeks, changing colour from steel to orange and then finally to brown.', '54.651146 -1.1827620', 3, 4),
(21, 'Redcar/Middlesbrough Border', 'This installation is made up of three semi- circular forms that meet in the centre of the curved edges. Reminiscent of wheels and an upturned boat hull. Track, wheels, water and boat shapes and patterns are etched and cut out of the planes representing three types of transportation (River, Rail and Road)\r\nStaron is a mineral-based synthetic material that is as robust as natural stone yet has the smooth finish of alabaster.''Dazzling white'' when installed the different facets of each piece will subtly change colour as natural lighting conditions change throughout the day.', '54.577984 -1.1989853', 2, 5),
(22, 'South Tees View Point', 'Sourcing part of the landscape then sculpting it and reframing it so it tells the story of this place.\r\nThis island was sculpted during the ice age. But when the planet warmed so the receding glaciers left erratics. Stones from another place carried along in the ice. Ancient time travellers that helped shape this place.\r\nThe artist’s approach was to visit each site and source these stones then sculp and polish them so their true beauty is revealed.\r\nEvery one will be unique with different textures and forms and each will be set on its own individual polished concrete plinth.', '54.582503 -1.1947810', 1, 5),
(23, 'South Bank Station', 'CURRENTLY UNDER REVIEW', '54.583607 -1.1772130', 4, 5),
(24, 'Coke Ovens', 'This work reflects the resilience of nature in the industrial Teesside environment. These ‘Fire Flowers’ (in acid etched galvanised steel) symbolise that resilience and hark back to when coal was burned at high temperature to create coke. The leaves will be cut in 4mm sheet and edged in a flat bar for strength and to provide a safe edge.', '54.584675 -1.1703987', 3, 5),
(25, 'Entrance to Coatham Marsh', 'The design represents a physical viewpoint. Its simple symetical yet organic form reflects how\r\nnature and industry live side by side in landscape. The form will be simple, striking, and yet have a graceful elegance like an eye or the imposing forms of the steelworks close by.\r\nThe stone will be Hillhouse Edge sandstone. The plinth would be cut in a curve to mirror the sculpture. Possibly formed from sandstone paving, or floated concrete.', '54.609519 -1.1028067', 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Trail`
--

CREATE TABLE IF NOT EXISTS `Trail` (
  `TrailID` int(11) NOT NULL,
  `Name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`TrailID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Trail`
--

INSERT INTO `Trail` (`TrailID`, `Name`) VALUES
(1, 'Darlington'),
(2, 'Stockton'),
(3, 'Middlesbrough'),
(4, 'Hartlepool'),
(5, 'Redcar and Cleveland');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `PassportPage`
--
ALTER TABLE `PassportPage`
  ADD CONSTRAINT `PassportPage_ibfk_1` FOREIGN KEY (`SculptureID`) REFERENCES `Sculpture` (`SculptureID`);

--
-- Constraints for table `Sculpture`
--
ALTER TABLE `Sculpture`
  ADD CONSTRAINT `ArtistID` FOREIGN KEY (`ArtistID`) REFERENCES `Artist` (`ArtistID`),
  ADD CONSTRAINT `Sculpture_ibfk_1` FOREIGN KEY (`TrailID`) REFERENCES `Trail` (`TrailID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
