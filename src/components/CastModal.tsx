import React, { useState, useEffect } from 'react';
import { EnhancedImageViewer } from './EnhancedImageViewer';

interface CastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToComic?: (page: number) => void;
}

interface CharacterAttribute {
  label: string;
  value: string;
}

interface CharacterSection {
  title: string;
  content: string;
}

interface Character {
  name: string;
  image: string;
  attributes: CharacterAttribute[];
  sections: CharacterSection[];
  quote?: string;
}

const castData: Character[] = [
  { 
    name: 'Dan', 
    image: 'https://missmab.com/Cast/Images/20_Dan.jpg',
    attributes: [
      { label: 'Name', value: `Daniel Ti'Fiona` },
      { label: 'Nicknames', value: 'Dan, Danny' },
      { label: 'Age', value: '25' },
      { label: 'Status', value: 'Retired(?) Adventurer' },
      { label: 'Family', value: 'Mother (Destania), Father (Edward), Sister (Alexsi)' },
      { label: 'Species', value: 'Feline' },
      { label: 'Hobbies', value: 'Adventuring, Swordfighting, Drinking, Dancing' },
      { label: 'Hair Colour', value: 'Brown' },
      { label: 'Eye Colour', value: 'Green' },
      { label: 'Often Seen', value: 'Showing off or Goofing off' },
      { label: 'Most known for', value: 'Going off on escapades' },
      { label: 'Favorite Food', value: 'Grilled Salmon, Ale' },
      { label: 'Favorite Colour', value: 'Red' },
      { label: 'First Appearance', value: 'Comic #1' },
    ],
    sections: [
      {
        title: 'Biography',
        content: `When first meeting Dan, he appears very much a shallow type of character. This may be in part due to his upbringing as an adventurer, a job which has often led him to dealing with the most unsavory of creatures and types. As such, he can be quite stubborn and habits die hard when it comes to impressions. Despite that, Dan obviously adores being the center of attention, and tries to keep an optimistic and lighthearted look on the world. On the flipside, Dan completely abhors injustice and is easy to nudge into embarking on an escapade if he feels there is a wrong out there he can make right. Whenever times are slow, it is often Dan who comes up with the idea for a wild and zany adventure...usually trying to involve amazons but failing. And it is also usually Dan who ends up getting the brunt of the damage, but by luck or manifest destiny he seems to get through most situations undamaged. Deep down Dan is really a hopeless romantic...or just hopeless in general. In his freetime Dan likes to collect weapons.`,
      }
    ],
    quote: "Well what do ya know... it CAN be set on fire!"
  },
  { 
    name: 'Mab', 
    image: 'https://missmab.com/Cast/Images/20_Mab.jpg',
    attributes: [
      { label: 'Name', value: 'Miss Mab' },
      { label: 'Nicknames', value: 'Mab or Mabby' },
      { label: 'Age', value: 'Unknown' },
      { label: 'Status', value: 'Blissful' },
      { label: 'Family', value: 'Pet? (Pip)' },
      { label: 'Species', value: 'Fae-Kitty' },
      { label: 'Hobbies', value: 'Hugging, Um...more hugging.' },
      { label: 'Hair Colour', value: 'Purple' },
      { label: 'Eye Colour', value: 'Turquoise' },
      { label: 'Often Seen', value: 'Hugging things, with Pip' },
      { label: 'Most known for', value: 'Her super fluffy tail' },
      { label: 'Favorite Food', value: 'Pixie Sticks' },
      { label: 'Favorite Colour', value: 'Secondary' },
      { label: 'First Appearance', value: 'Comic #1' },
    ],
    sections: [
      {
        title: 'Biography',
        content: `Mab is very much...well...Mabbish. She is Fae, a race that is disgustingly overpowered and thus does not have to worry much about thethe daily troubles and grinds of the world. This often leaves Mab free to do anything she desires, which is often just hugging random things and playing games. Because of this, Mab appears very childish, ditzy, and even rather dimwitted. Not to mention she has a bad habit of taking phrases for their literal meaning rather than implied. However when certain events arise, Mab has at times switched into a less care-free personality which some whisper may in fact be her true self. Mab is more than happy to go along with any of her friends plans with a smile and despite the worst odds seems to keep a cheerful optimism. It is very rare for Mab to actually have to exert herself as things always seem to fall into place when she's around. To some this makes her seem spoiled, to others it makes them glad she doesn't bother in the affairs of the world as other Fae in history have done.`
      }
    ],
    quote: "Everyday's a nice day with friends...or cookies. Or friends with cookies! That would be nice!"
  },
  { 
    name: 'Pip', 
    image: 'https://missmab.com/Cast/Images/20_Pip.jpg',
    attributes: [
      { label: 'Name', value: 'Pipclideous Dominiscus' },
      { label: 'Nicknames', value: 'Pip, "Gettitoff!"' },
      { label: 'Age', value: '16?' },
      { label: 'Status', value: 'Angry' },
      { label: 'Family', value: 'Owner? (Mab)' },
      { label: 'Species', value: 'Drake' },
      { label: 'Hobbies', value: 'Chasing, Biting, Grring, Napping' },
      { label: 'Eye Colour', value: 'Obsidian' },
      { label: 'Most known for', value: 'Sharpest Teeth in five counties' },
      { label: 'Favorite Food', value: 'Dan' },
      { label: 'First Appearance', value: 'Comic #2' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Pip is an angry angry creature. And he hates you.`
      }
    ]
  },
  { 
    name: 'Jyrras', 
    image: 'https://missmab.com/Cast/Images/20_Jyrras.jpg',
    attributes: [
      { label: 'Name', value: 'Jyrras Gianna' },
      { label: 'Nicknames', value: 'Jy, Jy-Jy, Jyro' },
      { label: 'Age', value: '21' },
      { label: 'Status', value: 'Inventing' },
      { label: 'Family', value: 'Daughters(?) (Deebs/Macy), Mother (Moira), Father (Seth), 6 sisters' },
      { label: 'Species', value: 'Kangaroo-rat/Kangaroo' },
      { label: 'Hobbies', value: 'Building, Inventing, Panicking' },
      { label: 'Hair Colour', value: 'Black' },
      { label: 'Eye Colour', value: 'Blue' },
      { label: 'Often Seen', value: 'Building things, being surprised/startled/terrified' },
      { label: 'Most known for', value: 'SCIENCE!' },
      { label: 'Favorite Food', value: 'Peaches' },
      { label: 'Favorite Colour', value: 'Blue' },
      { label: 'First Appearance', value: 'Comic #10' },
    ],
    sections: [
      {
        title: 'Biography',
        content: `Jyrras by nature is rather reclusive and shy, the only exception to that would be when he is in the company of those he feels comfortable with, or if a particular subject catches his attention. A genius and an inventor, Jyrras craves almost desperately to be accepted for his accomplishments and his achievements. He rather dislikes receiving any attention outside of that...which unfortunately seems to be the thing most individuals notice about him. The youngest child of a kangaroo and kangaroo rat, he has grown up in a family where he has always been half the height of all his siblings. As such, to many he still looks as is he is half his age, a fact which aggravates him to no end. It is for that reason Jyrras wears glasses and tries to promote a nerdy scientist persona. He will often hide behind his friends, and it is likely not surprising his closest friends are also types who adore being the center of attention, where as Jyrras prefers to play wing-man in the background. Deeply loyal, Jyrras can always be counted on to help those he cares about. However Jyrras' personal feelings are often kept hidden. Be this out of a fear of rejection or just an odd paranoia, who's to say.`
      }
    ]
  },
  { 
    name: 'Lorenda', 
    image: 'https://missmab.com/Cast/Images/20_Lorenda.jpg',
    attributes: [
      { label: 'Name', value: 'Lorenda Soulstealer' },
      { label: 'Nicknames', value: 'None' },
      { label: 'Age', value: '24' },
      { label: 'Family', value: 'Mother (Kria), Uncle (Dark Pegasus), Second-Cousin (Regina)' },
      { label: 'Species', value: 'Cow/Demon-mare' },
      { label: 'Hobbies', value: 'Cooking, Drinking, Reading, Hiking' },
      { label: 'Hair Colour', value: 'Cotton-Candy Pink' },
      { label: 'Eye Colour', value: 'Violet' },
      { label: 'Often Seen', value: 'Eating, drinking, Working' },
      { label: 'Most known for', value: 'Being the sane one' },
      { label: 'Favorite Food', value: 'Hamburgers (... just don\'t think about that one.)' },
      { label: 'Favorite Colour', value: 'Pink' },
      { label: 'First Appearance', value: 'Comic #13' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Lorenda is a very independent character...or at least she tries to be. She is also the most level-headed character...or at least she tries to be. Lorenda often finds herself the straight-man of a group simply because the company she keeps is often so eclectic. Unlike other half-demons, Lorenda works really hard on maintaining a normal life that is devoid of chaos and destruction. For the most part Lorenda works rather well in normal society but every now and then she slips back into her demonic tendencies much to the encouragement and glee of her mother. Lorenda hates feeling in debt to anyone and will go the extra mile to return favours and gifts. Given the chance, Lorenda can be downright silly and hardly ever passes a chance to drink and party. All in all, Lorenda is a very open and honest individual who usually tries to solve confront issues when she sees them developing. In her freetime, she likes to read romance novels.`
      }
    ]
  },
  { 
    name: 'Wildy', 
    image: 'https://missmab.com/Cast/Images/20_Wildy.jpg',
    attributes: [
      { label: 'Name', value: 'Wildy san' },
      { label: 'Nicknames', value: 'None' },
      { label: 'Age', value: '22' },
      { label: 'Status', value: 'Dangerous' },
      { label: 'Family', value: 'Brother (Biggs)' },
      { label: 'Species', value: 'Ferret' },
      { label: 'Hobbies', value: 'Dancing, Mayhem, Gaming, Fighting, Writing' },
      { label: 'Hair Colour', value: 'Red' },
      { label: 'Eye Colour', value: 'Blue' },
      { label: 'Often Seen', value: 'Playing games, Going on power trips, picking on Dan' },
      { label: 'Most known for', value: 'Going sarcastic to evil in 2 seconds flat.' },
      { label: 'Favorite Food', value: 'Steak and cheese sandwiches' },
      { label: 'Favorite Colour', value: 'Shiny' },
      { label: 'First Appearance', value: 'Comic #2' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Wildy is only half the size of most characters, but she has shown to be more than capable of taking on opponents larger and stronger than her. To those who don't know her, she often appears as scheming, devious, and brutal. To those who do know her, she still appears like that but with reasons behind them. It is not uncommon for Wildy to go through strange alterations in her personality and will often appear quite friendly and cheerful the minutes before she launches into a barbed attacked. Quick wit, and quick tongue, Wildy will often say what she thinks without any real regards to tact. She is prone to causing fights on whimsy and holds grudges for quite a long time. On the flip-side, Wildy is incredibly protective of those she cares about and often has a big sister approach of "no one can mess with them but me" when it comes to others. Wildy often has many levels to her reasoning and most of what she does or says or feels has an alternate motive. It usually seems there is always some plan afoot when she is about. All in all, she's a very devious ferret. In her spare time she often plays video games and practices fighting with her shaman stick. How she actually qualified for a shaman degree is a mystery to many.`
      }
    ],
    quote: "Don't make me get the newspaper Dan..."
  },
  { 
    name: 'Alexsi', 
    image: 'https://missmab.com/Cast/Images/04_Alexsi.jpg',
    attributes: [
      { label: 'Name', value: 'Alexsi Ti\'Fiona' },
      { label: 'Nicknames', value: 'Lexsi, Lex' },
      { label: 'Age', value: '27' },
      { label: 'Status', value: 'Dating Pyroduck' },
      { label: 'Family', value: 'Step-Mother (Destania), Father (Edward), Brother (Dan)' },
      { label: 'Species', value: 'Feline' },
      { label: 'Hobbies', value: 'Innkeeping, Brewing, Martial Arts, Writing' },
      { label: 'Hair Colour', value: 'Blonde' },
      { label: 'Eye Colour', value: 'Blue' },
      { label: 'Often Seen', value: 'Tending to the Inn... with her mallet' },
      { label: 'Most known for', value: 'Pain. Lots of mallet pain.' },
      { label: 'Favorite Food', value: 'Roast Chicken' },
      { label: 'Favorite Colour', value: 'Red' },
      { label: 'First Appearance', value: 'Comic #2' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Alexsi's personality is rather hard to define. Most of the time one meets Alexsi is when she is in a rather sour mood due to some trouble at the inn or some trouble with her brother...though the two cases tend to be hand in hand half the time. Quick to temper, Alexsi is more than happy to use a large mallet she carries as a means of ejecting said problems out the door, and after so many years of practice, she is quite accurate in her aim. Underneath it all is a very sympathetic and caring being who wants all who live around her to be happy. And while she often has to be the voice of reason, Alexsi deep down could not see life without the crazy antics that go around in her inn.`
      },
      {
        title: 'History',
        content: `Alexsi's father, Edward Ti'Fiona, once had a first wife who passed away from unsaid reasons. Because of this, Alexsi has few real memories of her mother and no real mementos save for a large mallet left behind. Edward later remarried a succubus named Destania and unlike most tales of evil stepmothers, Alexsi and Destania got along smashingly well. As her and her younger brother Dan grew up, it seemed Alexsi was going to be the more responsible of the two and it was no surprise that Alexsi inherited the Lost Lake inn and tavern when she got older. While the reasons as to Destania and Edward's leaving are still a mystery, Alexsi has been in charge of the inn for some time now and runs it still today.`
      }
    ],
    quote: "Ok... who broke what and how?"
  },
  { 
    name: 'Abel', 
    image: 'https://missmab.com/Cast/Images/04_Abel.jpg',
    attributes: [
      { label: 'Name', value: 'Abel' },
      { label: 'Nicknames', value: '"Cookies and Cream"' },
      { label: 'Age', value: '399' },
      { label: 'Status', value: 'Single' },
      { label: 'Family', value: 'Unknown' },
      { label: 'Species', value: 'Feline incubus' },
      { label: 'Hobbies', value: 'Magic, Fashion, Reading' },
      { label: 'Hair Colour', value: 'Cream with brown highlights/black spots' },
      { label: 'Eye Colour', value: 'Green (right), Blue (left)' },
      { label: 'Often Seen', value: 'Causing trouble' },
      { label: 'Most known for', value: 'Instigating the library incident at SAIA' },
      { label: 'Favorite Food', value: 'Roast Duck/Confusion' },
      { label: 'Favorite Colour', value: 'Green' },
      { label: 'First Appearance', value: 'Comic #424' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Abel is a talented and intelligent Cubi...which is about as far as anyone bothers to get to know him. His general disposition and tendency to cause unhappiness to those around him often leaves him alone to his own devices. Despite his anti-social behavior, he was considered to be one of the top students at SAIA...though if this was due to his skills or Fa'Lina playing favorites is rumoured. For the most part, Abel seems to prefer being alone and will often pull grand pranks and mindgames in order to keep others at a distance. However, it seems Abel lacks any real malice behind his actions and some would likely say that the majority of his actions are done out of fear and desperation. Though not to his face...cause he'd likely knee them in the groin.`
      },
      {
        title: 'History',
        content: `Not much is known of Abel's life outside of the Academy, though his times in the Academy had often either been of him achieving high academic standings or epic disasters. It is known that Abel belongs to a now more or less extinct clan in that the surviving members are too fragmented and scattered to be an actual considered clan anymore. It is also known that he is more or less considered adopted by Fa'Lina herself and while he doesn't show it, she is one of the few Cubi he actually respects and cares about. At the current time, he has been assigned to watch over Dan and teach him the most basic of Cubi knowledge until Dan is ready to enroll in the Academy himself. Neither Abel or Dan seem pleased at this.`
      }
    ],
    quote: "I'm flattered you used both your brain cells to try to come up with that response..."
  },
  { 
    name: 'Pyroduck', 
    image: 'https://missmab.com/Cast/Images/04_Pyro.jpg',
    attributes: [
      { label: 'Name', value: 'Pyroduck' },
      { label: 'Nicknames', value: 'Ducky, Pyro, "How did you get here?!"' },
      { label: 'Age', value: 'Unknown' },
      { label: 'Status', value: 'Dating Alexsi' },
      { label: 'Family', value: 'Adopted-Mother (Fa\'Lina)' },
      { label: 'Species', value: 'Dragon' },
      { label: 'Hobbies', value: 'Writing, Observation, Traveling' },
      { label: 'Hair Colour', value: 'Dark Green' },
      { label: 'Eye Colour', value: 'Gold' },
      { label: 'Often Seen', value: 'Making 4th wall comments' },
      { label: 'Most known for', value: 'Being there at the right place at the right time.' },
      { label: 'Favorite Food', value: 'Pastas' },
      { label: 'Favorite Colour', value: 'Blues and Greens' },
      { label: 'First Appearance', value: 'Comic #70' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `No one really knows much about Pyroduck, and Pyroduck tends not to tell much about him. Pyroduck does have a general good sense of humor and loves to sit back and comment on things, however his personality and sense of timing often keeps him from being labeled the straight man. Often-times Pyroduck is seen writing in a series of journals and when asked he claims to be documenting. For what purpose is unknown also though. Easy-going, Pyroduck is often the one to go to when a third non-biased opinion is needed. However, despite him living at Lost Lake, he is often off in the countryside so finding him when you need him is another matter. On the other hand, Pyroduck always seems to never have any problem dropping in with a quick comment at just the right moment.`
      },
      {
        title: 'History',
        content: `No one really knows. Dan and Mab ran across him on the way to Twink Territories and since then Pyroduck has been living in Dan's former room at Lost Lake.`
      }
    ],
    quote: "Yeah. That's a great idea. I'm just going to step over... here..."
  },
  { 
    name: 'Fi', 
    image: 'https://missmab.com/Cast/Images/04_Fi.jpg',
    attributes: [
      { label: 'Name', value: 'Fi' },
      { label: 'Nicknames', value: 'none' },
      { label: 'Age', value: '3' },
      { label: 'Status', value: 'Owner (Daniel Ti\'Fiona)' },
      { label: 'Family', value: 'Unknown' },
      { label: 'Species', value: 'Warp-Aci' },
      { label: 'Hobbies', value: 'Eating, Lounging, Mooching' },
      { label: 'Hair Colour', value: 'Hair?' },
      { label: 'Eye Colour', value: 'Blue' },
      { label: 'Often Seen', value: 'Flying about' },
      { label: 'Most known for', value: 'Avoiding becoming a Pip-crunchie' },
      { label: 'Favorite Food', value: 'Hot Pockets' },
      { label: 'Favorite Colour', value: 'Brown' },
      { label: 'First Appearance', value: 'Comic #416' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Fi's personality is quirky as far as the standard warp-aci goes. While obedient to its owner, Fi will be more than happy to vocally express its displeasure at a task, or lob random insults and snarky comments. However on average Fi enjoys new things, especially new foods, and seems to get a kick out of life. Even when all that it does is loaf around a couch eating Sunchips.`
      },
      {
        title: 'History',
        content: `Fi was created by Fa'Lina to be a messenger Warp-Aci, and basically act as a teleporter to accepted students so that they could get to the Succubi and Incubi Academy. However an incident with a particular gold drake during its job to retrieve Dan caused Fi to panic and attempt hiding in the portal located in a sword Dan owned. This break from the normal plane severed Fi's connection to Fa'Lina thus making Fa'Lina assume the worst. By the time Fi did return, Fa'Lina had already summoned a new warp-aci, causing Fi's original moniker as Fa'Lina clan to be null. As such, Fi has been assigned to be Dan's warp-aci and to teleport both Dan and Abel to the Academy and back when need be.`
      }
    ],
    quote: "Ch-Ya! Why does everything have to have pointy teeeth!?"
  },
  { 
    name: 'Kria', 
    image: 'https://missmab.com/Cast/Images/04_Kria.jpg',
    attributes: [
      { label: 'Name', value: 'Kria Soulstealer' },
      { label: 'Nicknames', value: 'Kria, Kree-Kree' },
      { label: 'Age', value: '418' },
      { label: 'Status', value: 'Single ("Divorced")' },
      { label: 'Family', value: 'Daughter (Lorenda), Brother (Dark Pegasus), Second-Niece (Regina)' },
      { label: 'Species', value: 'Demon-Mare' },
      { label: 'Hobbies', value: 'Chaos, Destruction, Hiking' },
      { label: 'Hair Colour', value: 'Red' },
      { label: 'Eye Colour', value: 'Red' },
      { label: 'Often Seen', value: 'Most don\'t live long enough to report it' },
      { label: 'Most known for', value: 'Being a bane to society and street festivals' },
      { label: 'Favorite Food', value: '*cough* Next question...' },
      { label: 'Favorite Colour', value: 'Red' },
      { label: 'First Appearance', value: 'Comic #96' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Kria is the general embodiment of what the demon-race has to offer. Quick, manipulative, and sometimes downright cruel, Kria has done many things without the least bit of remorse. Most of this is due to the reasoning demons have in that anything with power has the right to use it over anything that doesn't. However, Kria has a few soft spots and as far as demons go, she is actually quite compassionate and good-tempered. Her main soft spot is her daughter Lorenda whom she tries her best to keep in good contact with, though at times that is strained. Deep down, she is a little bit absent-minded when it comes to the way the world works despite her age, and in other cases she is a bit naive and prone to massive mood swings. This is likely due to the world practically changing right around her, which not only has left her trying to keep up with the times, but also fretting about the position she is in. Either way, Kria has managed to stay on top of the game and is one of the more infamous creatures in Furrae.`
      },
      {
        title: 'History',
        content: `Kria's past is one of which she never really talks about...or if she did one never really lives long enough to write down. She was raised a demon-mare, and excelled in her studies. Since then she has been a freelancer of sorts, going on a rampage here...assassinations there...as well as the general demon chaos. During one of those times she met a Bull whom she fell quite infatuated with. It ended rather tragically though when she caught him cheating on her with another mare. Shortly afterwards Kria found she was pregnant with Lorenda. Since then she has been stuck juggling between being a demon and being a mom.`
      }
    ],
    quote: "I don't see why you're complaining, I let you keep your legs..."
  },
  { 
    name: 'Biggs', 
    image: 'https://missmab.com/Cast/Images/04_Biggs.jpg',
    attributes: [
      { label: 'Name', value: 'Biggs san' },
      { label: 'Nicknames', value: 'Biggs' },
      { label: 'Age', value: '22' },
      { label: 'Status', value: 'Ruling Twink Territories' },
      { label: 'Family', value: 'Sister (Wildy)' },
      { label: 'Species', value: 'Ferret' },
      { label: 'Hobbies', value: 'Romancing, Ruling, Fighting' },
      { label: 'Hair Colour', value: 'Pinkish-Red' },
      { label: 'Eye Colour', value: 'Blue' },
      { label: 'Often Seen', value: 'Surrounded by beautiful females' },
      { label: 'Most known for', value: 'Stealing random artifacts' },
      { label: 'Favorite Food', value: 'Pomegranates' },
      { label: 'Favorite Colour', value: 'Gold' },
      { label: 'First Appearance', value: 'Comic #85' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Biggs enjoys living large... well... as large as a ferret his size can live. Ruler of the dreaded Twink Territories, Biggs is in command of some of the most mindless and power-gaming minions in all of Furrae. Luckily, they all tend to keep to themselves in a distant territory and are content to cause epic trouble amongst themselves. However when trouble does come about from twinks, chances are it is all due to Bigg's mastermind. Like his sister Wildy, Biggs will take any advantage he can get and underneath the party boy and playing exterior is quite the quick and sinister mind. Biggs rarely forgets anything, from a crush to a grudge. So if you've crossed paths, you likely haven't seen the last of him.`
      },
      {
        title: 'History',
        content: `While Wildy rarely talks of her past, Biggs talks even less about his. This might be because exposing ones past opens one up to possible attacks and the last place to have any weakness is in the twink territories. This might change as time goes by, but as of now, it is mostly only known that Biggs has had a long running rivalry with Wildy and at some point he had managed to gain control of the Twinks, a feat few can even consider.`
      }
    ],
    quote: "When in doubt, set it on fire and blow it up."
  },
  { 
    name: 'M.A.C.E. / Deathbringer', 
    image: 'https://missmab.com/Cast/Images/20_DeebsMacy.jpg',
    attributes: [
      { label: 'Name', value: 'M.A.C.E / Deathbringer' },
      { label: 'Nicknames', value: 'Macy / Deebs' },
      { label: 'Age', value: '1 / 1' },
      { label: 'Status', value: 'Online / Active' },
      { label: 'Family', value: 'Father(?) (Jyrras)' },
      { label: 'Species', value: 'Robot / Bubble-Gum' },
      { label: 'Hobbies', value: 'Still Pending / Dolls' },
      { label: 'Hair Colour', value: '- / -' },
      { label: 'Eye Colour', value: '- / -' },
      { label: 'Often Seen', value: 'Lurking in Jyrras\' lab' },
      { label: 'Most known for', value: 'See above' },
      { label: 'Favorite Food', value: '- / -' },
      { label: 'Favorite Colour', value: 'FF66CC / Pink' },
      { label: 'First Appearance', value: 'Comic #376 / #369' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Information regarding M.A.C.E is currently still classified. Mostly because M.A.C.E. herself is still trying to figure out what her personality should be. She'll figure it out sooner or later. In the meantime she prefers to keep a low profile and observe. Deathbringer, on the other hand, tends to be more outgoing despite being told a few times she should keep a low profile. This usually results in her just flying really close to the ground. She means well but high intelligence doesn't seem to be something she has. Kindhearted and curious, she sees everything as a new game and adventure. Despite being made of bubblegum, she seems to magically be able to avoid getting stuck to things. Such is the way of magical bubblegum bunnies.`
      }
    ]
  },
  { 
    name: 'Matilda', 
    image: 'https://missmab.com/Cast/Images/04_Matilda.jpg',
    attributes: [
      { label: 'Name', value: 'Matilda Kissriss' },
      { label: 'Nicknames', value: 'Mattie, "three-eyes"' },
      { label: 'Age', value: '216' },
      { label: 'Status', value: 'Single' },
      { label: 'Family', value: 'Mother, Sister, Brother' },
      { label: 'Species', value: 'Mythos' },
      { label: 'Hobbies', value: 'Collecting, Fire magic, Theater' },
      { label: 'Hair Colour', value: '?' },
      { label: 'Eye Colour', value: 'Blue' },
      { label: 'Often Seen', value: 'Tending to her store, going to plays' },
      { label: 'Most known for', value: 'Her collecting habits' },
      { label: 'Favorite Food', value: 'Wine' },
      { label: 'Favorite Colour', value: 'Green' },
      { label: 'First Appearance', value: 'Comic #407' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Matilda is very friendly and very outgoing, which is a rare trait for her particular species. She runs a small knick-knack shop that doubles as a magical homes store, which is her pride and joy. A fan of the arts, Matilda is often a big donator to local theater groups and has a full assortment of season tickets to all sorts of musicals and Broadway shows. Very straight to the point, Matilda makes no real attempt to hide her feelings or opinions. It may be the many years of watching plays, but Matilda is a highly romantic character and often seems to know the right thing to say at the right time.`
      },
      {
        title: 'History',
        content: `Matilda was raised in a place called "Blue Volcano". While not a real volcano of sorts, the whole place was a land of blue-hot flames which Matilda's species are known to thrive in. After her father passed away, her older brother became head of the family and when Matilda disagreed with a few of the new rules, she was exiled from her home. The rules argued over is uncertain, but it was known Matilda was always a bit odd from her kind and was a bit soft-hearted. Leaving, Matilda wandered around before making friends with some random traders who got her into the business of merchanting. After about a hundred years of this, Matilda had enough to set up her own small store which she owns to this day. Her store is pretty well known in the creature world for having top-quality merchandises, though a rather tacky set-up.`
      }
    ],
    quote: "You break it or buy it. If not I break you."
  },
  { 
    name: 'Dark Pegasus', 
    image: 'https://missmab.com/Cast/Images/04_DP.jpg',
    attributes: [
      { label: 'Name', value: 'Aliph Soulstealer' },
      { label: 'Nicknames', value: 'The Dark Pegasus, DP' },
      { label: 'Age', value: '760' },
      { label: 'Status', value: 'Dead' },
      { label: 'Family', value: 'Sister (Kria), Niece (Lorenda), Second-Niece (Regina)' },
      { label: 'Species', value: 'Demon-Pegasus' },
      { label: 'Hobbies', value: 'Plotting, Reading, Experimenting' },
      { label: 'Hair Colour', value: 'Light Red' },
      { label: 'Eye Colour', value: 'Red' },
      { label: 'Often Seen', value: 'Brooding, Attempting a grand scheme of evil' },
      { label: 'Most known for', value: 'Being the creator of the Undead race' },
      { label: 'Favorite Food', value: 'Doesn\'t really eat these days, but enjoys tea' },
      { label: 'Favorite Colour', value: 'Dark Red' },
      { label: 'First Appearance', value: 'Comic #148' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Not a whole lot is known about Dark Pegasus, which is likely due to his reclusive nature. While he is more than willing to engage in acts of evil intent, Dark Pegasus is very much a creature of civility. He is very self-aware of the stereotypes that exist for those who are considered a description and thus will try to avoid falling into said stereotypes himself. Sometimes this works better than others. Despite the deeds he does, it seems Dark Pegasus doesn't necessarily enjoy engaging in evil so much that he feels they are a necessity to achieve whatever goals he has. As such, he has a high distaste for wasteful and pointless acts of violence and tends to look down on many of his demon kin...giving him the appearance as a bit of a snob. However, due to various events, Dark Pegasus has grown more paranoid over the years and also seems to have taken up a few of the habits that he strives so hard to avoid. There are many things about Dark Pegasus that are unknown, no doubt this is due to Dark Pegasus himself making it that way.`
      },
      {
        title: 'History',
        content: `There are many things unknown about Dark Pegasus' past. The biggest event surrounding him was his involvement in the creation of the Undead race...which later spawned a series of laws in regards to creating new life and races. From most sources, it seemed that Dark Pegasus had spent a good amount of time preparing to create a massive Undead army from all those that had recently died. The exact nature of the spell is unknown since Dark Pegasus has been very careful not to reveal his secrets...however it is known there was a minor oversight and when all the dead arose from their graves, the fact they had retained their former memories and free will became very apparent. Embarrassed, and slightly enraged, Dark Pegasus retreated to the shadows. Years later he made a slight comeback with a different plan involving some forgotten dark god, only for him to be defeated by a novice adventurer Daniel Ti'Fiona. He's been back two other times with the same attempt...and the same results. How he has been able to come back is anyones guess, but many suspect Dark Pegasus has some powerful allies and that perhaps in his learning about Undeath, he had discovered a way to truly bring oneself back.`
      }
    ],
    quote: "We will meet again."
  },
  { 
    name: 'Merlitz', 
    image: 'https://missmab.com/Cast/Images/04_Merlitz.jpg',
    attributes: [
      { label: 'Name', value: 'Merlitz Meshaiko' },
      { label: 'Nicknames', value: 'Merl, Mer' },
      { label: 'Age', value: '27' },
      { label: 'Status', value: 'Single' },
      { label: 'Family', value: 'None' },
      { label: 'Species', value: 'Tiger/Cheetah hybrid' },
      { label: 'Hobbies', value: 'Studying Magic, Keeping Peace, Flower Arranging' },
      { label: 'Hair Colour', value: 'Brown' },
      { label: 'Eye Colour', value: 'Blue' },
      { label: 'Often Seen', value: 'Training, Practicing Magic, Working for Alexsi' },
      { label: 'Most known for', value: 'Casting Fireballs...at you name it.' },
      { label: 'Favorite Food', value: 'Steak' },
      { label: 'Favorite Colour', value: 'Blue' },
      { label: 'First Appearance', value: 'Comic #3' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Merlitz is often considered the straight man of the Lost Lake crew and more than not is put into the job of trying to keep things in order when chaos is erupting. Honest and to the point, Merlitz will often take things at face value which often leads him to being taken advantage of, that or him missing anything subtle. However Merlitz's fire magic reflects his temper in that when something does push him the wrong way, he isn't above taking action against it. Due to the randomness of everyone around him, Merlitz is likely the most stressed of the group and it isn't odd for him to disappear now and again to relax. He takes his job and life seriously though at times he misses being an adventurer. However when Merlitz is called into doing something, his sense of honor will always ensure that he sticks with it.`
      },
      {
        title: 'History',
        content: `Merlitz keeps his childhood to himself, though one wonders if that is partially because he can't remember much of it himself. For the longest time Merlitz had been an adventurer with a random party until one fateful day Merlitz encountered a human. After trying to tell this to his teammates, they decided it was best for Merlitz to take a break from the adventuring job and perhaps take up something less stressful. It was right after that that he applied for a job as Alexsi's bodyguard and started work at Lost Lake. Needless to say this was not the less stressful thing Merlitz had in mind. Regardless, Merlitz has grown rather fond of the inhabitants and would do anything for them, even if he doesn't let them know that up front. For a while he was dating the succubus Aaryanna, but it would seem the two have gone their separate ways. What this means for the future is currently unknown.`
      }
    ],
    quote: "That skylight wasn't there this morning..."
  },
  { 
    name: 'Regina', 
    image: 'https://missmab.com/Cast/Images/04_Regina.jpg',
    attributes: [
      { label: 'Name', value: 'Regina Darkblood' },
      { label: 'Nicknames', value: 'Gina' },
      { label: 'Age', value: '23' },
      { label: 'Status', value: 'Single' },
      { label: 'Family', value: 'Second Cousin (Lorenda), Second-Uncle (Dark Pegasus), Second-Aunt (Kria)' },
      { label: 'Species', value: 'Demon-Gazelle' },
      { label: 'Hobbies', value: 'Mayhem, Murder, Jewelry-making' },
      { label: 'Hair Colour', value: 'Light pink with black ends' },
      { label: 'Eye Colour', value: 'Purple' },
      { label: 'Often Seen', value: 'Working for Kria as a maid' },
      { label: 'Most known for', value: 'Nearly killing Wildy' },
      { label: 'Favorite Food', value: 'Meat' },
      { label: 'Favorite Colour', value: 'Pink' },
      { label: 'First Appearance', value: 'Comic #388' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Regina is for many intents and purposes, a typical young demon. She is impulsive, short-tempered, powerful...and in many ways short-sighted when it comes to long term repercussions. She eagerly looks forward to the time she will be able to raze countrysides and destroy all who oppose her, but without some of the age and experience to back her...she comes across as reckless and likely to get herself killed easily by random adventurers. Self-absorbed and petty, Regina particularly enjoys toying with others and often views everyone else as simply a means to entertain her or something to be used. The rare exception to this is her second-aunt Kria whom she idolizes greatly and hopes to one day be as effective a demon. It is likely because of her idolization that she has a severe grudge against Kria's daughter Lorenda...who she feels is a wasteful lump of inambition and it is likely this stems from a jealousy of Kria's devotion to her daughter. Regardless, Regina bides her time and fantasizes about how she will one day rule a small kingdom of pretty boys.`
      },
      {
        title: 'History',
        content: `Regina's past is somewhat unknown. It is suspected that her relationship with her parents were strained at best. After a particularly nasty incident, it was decided Regina should likely move in with her second-aunt in order to possibly gain some wisdom from a more experienced demon. That and to lay low for a few years while until the incident cooled off. Currently Regina works for Kria as a maid in exchange for room and board and other than issues with other members of the staff and the frustration of being held back...Regina seems to enjoy herself.`
      }
    ],
    quote: "It's all mind over matter! I don't mind...you don't matter!"
  },
  { 
    name: 'Aaryanna', 
    image: 'https://missmab.com/Cast/Images/04_Aaryanna.jpg',
    attributes: [
      { label: 'Name', value: 'Aaryanna' },
      { label: 'Nicknames', value: 'Aary, Aary-kitty' },
      { label: 'Age', value: '428' },
      { label: 'Status', value: 'A teacher at SAIA' },
      { label: 'Family', value: 'Unknown' },
      { label: 'Species', value: 'Feline Succubus' },
      { label: 'Hobbies', value: 'Romancing, Dream-hopping, Pancake cooking' },
      { label: 'Hair Colour', value: 'Lavender' },
      { label: 'Eye Colour', value: 'Red' },
      { label: 'Often Seen', value: 'Teaching, Reading Cubi Lore' },
      { label: 'Most known for', value: 'The sites not rated for this question.' },
      { label: 'Favorite Food', value: 'Passion or Pain' },
      { label: 'Favorite Colour', value: 'Black' },
      { label: 'First Appearance', value: 'Comic #217' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Aaryanna's personality is a mixture of pride and naive. Having lived a rather sheltered life in the Cubi Academies for much of her existence, Aary's perspective of the world is rather skewed. Aaryanna is highly intelligent when it comes to Cubi-related things, however she is finding that what she is learning seems to not mesh with what is going on outside. A rather quick temper, Aaryanna is very prone to letting her emotions get the better of her. With a deep-rooted pride for her heritage, she finds many things that go against what she has been taught very frustrating. Despite it all, Aaryanna does her best to get along with most people and often has to curb her own Cubi tendencies out of respect. Luckily, Aaryanna also tends to have a short attention span so her fits of anger quickly subside as she gets distracted by some random thing.`
      },
      {
        title: 'History',
        content: `Aaryanna was born a Cubi and raised a Cubi deep within one of the hidden cities. A rather prodigal child, Aary was enrolled early to the Cubi Academies where she excelled in many of her classes. While popular, she made friends with her professor Destania the most and it was predicted that when Destania retired, Aaryanna was next in line for the position. However after Destania disappeared, Aaryanna soon forgot about that as she declared herself going on a quest for her friend and teacher. As soon as she graduated she had set off to search for Destania only to learn from an oracle that Daniel Ti'Fiona had killed her teacher. Angered, Aaryanna searched for Dan with no prevail. Finally settling for a while at an abandoned mansion, Aaryanna spent a few months sulking and brooding when Merlitz and crew arrived. For a while she was dating Merlitz, however the two at the time have gone separate paths as she opted to follow a career and return to her roots.`
      }
    ],
    quote: "Heehee... in your dreams... really."
  },
  { 
    name: 'Devin', 
    image: 'https://missmab.com/Cast/Images/04_Devin.jpg',
    attributes: [
      { label: 'Name', value: 'Devin Soulstealer' },
      { label: 'Nicknames', value: 'Dev, D\'R' },
      { label: 'Age', value: 'Deceased' },
      { label: 'Status', value: 'See Above' },
      { label: 'Family', value: 'None' },
      { label: 'Species', value: 'Undead' },
      { label: 'Hobbies', value: 'Writing, Cooking, Taxidermy' },
      { label: 'Hair Colour', value: 'Blue' },
      { label: 'Eye Colour', value: 'Yellow (Glowing)' },
      { label: 'Often Seen', value: 'Maintaining Kria\'s manor' },
      { label: 'Most known for', value: 'Being the only Undead Kria\'s brother hasn\'t re-killed.' },
      { label: 'Favorite Food', value: 'None' },
      { label: 'Favorite Colour', value: 'Light Blue' },
      { label: 'First Appearance', value: 'Comic #965' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `On a good day, Devin comes across as snarky, quick-tongued, and quick to insult. On a bad day, one would just assume he is a downright jerk. Those who get to know him tend to realize his taunts are more in jest than anything truly serious...but combined with his Undead nature, most strangers tend to avoid being around Devin too long. Devin currently occupies his time with maintaining Kria's mansion while Kria is off and away and is in many ways considered one of Kria's most trusted advisers. As such, he often isn't seen wandering too far about as most tend to have a negative reaction to Undead, including Kria's brother. Devin's personality is a bit of an issue due to the nature of his Undeath. Being one of the first Undead before sentience was re-gained, and having had to create his personality from scratch once he did regain sentience...it is unknown if Devin's soul is that of the original being or if it is an all new individual entirely. Either way, Devin seems to not care.`
      },
      {
        title: 'History',
        content: `Devin's history is a bit of a mystery to most. He was one of the first Undead constructs created by Dark Pegasus back in the time DP was still learning how to channel the forces of such magic. As such, the vast majority of Devin's existence had been of a mindless servant. It is known that Devin was given to Kria by her brother at her request and for the longest time he had been a servant in her mansion. However the event that caused all the Undead to first rise up had a secondary effect in that all previously created Undead also gained sentience. Unfortunately in Devin's case (as well as many Undead who were created before the event), the time between his death and such an event was far too distant and it resulted in Devin coming into sentience with no memories or personality whatsoever. While most took this as a chance to dispose of their Undead creations, Kria took it upon herself at that time to re-teach Devin to the best of her abilities and as such considers him almost akin to her son, even extending her last name to him. Since that time, Devin has been a member of the Soulstealer household, though prefers to keep a low profile.`
      }
    ],
    quote: "Don't make me slap you from over here, I can likely reach you."
  },
  { 
    name: 'Fa\'Lina', 
    image: 'https://missmab.com/Cast/Images/07_LinaFa.jpg',
    attributes: [
      { label: 'Name', value: 'Fa\'Lina' },
      { label: 'Nicknames', value: 'Unknown' },
      { label: 'Age', value: '9,288' },
      { label: 'Status', value: 'SAIA' },
      { label: 'Family', value: 'Adopted Kin (Abel, Pyroduck)' },
      { label: 'Species', value: 'Canine Succubus' },
      { label: 'Hobbies', value: 'Unknown' },
      { label: 'Hair Colour', value: 'Pink' },
      { label: 'Eye Colour', value: 'Gold' },
      { label: 'Often Seen', value: 'Overseeing the goings on of SAIA' },
      { label: 'Most known for', value: 'Being the headmaster of SAIA.' },
      { label: 'Favorite Food', value: 'Unknown' },
      { label: 'Favorite Colour', value: 'Pink' },
      { label: 'First Appearance', value: 'Comic #424' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Fa'Lina's personality is often hard to properly describe as it will change depending on those she is around. To some, she is a creature of pure compassion and sympathy...to others she is devious and a creature of malice. In any respect, Fa'Lina always seems to know the best way to motivate anyone she encounters. However, what she is motivating them for has often been left open for speculation. Regardless, Fa'Lina is a succubi that exudes power and authority and has no qualms about making both things well known to anyone who treads SAIA grounds. Those who study at the Academy are quick to learn that Fa'Lina isn't simply a powerful Cubi, she is almost a force all unto herself.`
      },
      {
        title: 'History',
        content: `It was well-known Fa'Lina was the founder of a clan thousands of years back. It is also known that Fa'Lina's clan was one of the many that was nearly wiped out during the Cubi-Dragon war. As a clan founder, Fa'Lina was no longer able to have children of her own...and with the destruction of all her clan members, many assumed that when Fa'Lina disappeared it was due to suicide out of grief. However Fa'Lina returned along with a promise of a sanctuary for Cubi from the ongoing war. A place in which Cubi could be nurtured and protected as well as learn skills in which to survive in an increasingly hostile world. Almost all remaining clans agreed to the proposal, be it out of desperation or that they saw this as a potential boon to their own clans. Thousands of years later, long after the war had ended, SAIA is now considered the place where all clans send their children by default. Most view Fa'Lina's action to start the Academy a way for her to have a faux clan to channel her energy into. The fact that the Cubi who attend SAIA do seem more powerful and successful than the non-attending counterparts only back up this theory.`
      }
    ],
    quote: "The fact you are breathing means that I still hope something intelligent will come from your lips. Please don't dissapoint me with your next sentence."
  },
  { 
    name: 'Azlan', 
    image: 'https://www.missmab.com/Cast/Images/04_Azlan.jpg',
    attributes: [
      { label: 'Name', value: 'Azlan (Last name unknown)' },
      { label: 'Nicknames', value: 'Azzie, Az' },
      { label: 'Age', value: 'Unknown' },
      { label: 'Status', value: 'Married' },
      { label: 'Family', value: 'Wife (Neni)' },
      { label: 'Species', value: 'Fae Fox' },
      { label: 'Hobbies', value: 'Adventuring, Swordfighting, Magic, Random acts of chaos' },
      { label: 'Hair Colour', value: 'Red' },
      { label: 'Eye Colour', value: 'Turquoise' },
      { label: 'Often Seen', value: 'Going on quests, doing random things' },
      { label: 'Most known for', value: 'Bringer of squeeky doom!' },
      { label: 'Favorite Food', value: 'Cake' },
      { label: 'Favorite Colour', value: 'Purple' },
      { label: 'First Appearance', value: 'Comic #135' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Azlan is a strange combination of personalities. On one hand there is the heart of a brave warrior who strives to do justice in a sometimes unjust world. On the other hand there is a quirky fae who simply wants to be silly and have a good time. This is often reflected in Azlan's cheery mood and sense of humour, though occasionally Azlan's more serious side will break free. Loyal and trustworthy, Azlan is a great companion for many an adventure, though at times his sanity seems to be rather...nonexistent. Most assume this is the Fae aspect of Azlan though.`
      },
      {
        title: 'History',
        content: `Like Mab, Azlan seems to have left the Fae kingdom for some unknown reason...though it appears Azlan's reason is less severe as he mentions visiting there occasionally. For whatever reason though, Azlan prefers to stay in the normal realm of Furrae and acts as an adventurer for hire. In his off-time, he is often seen hanging around Lost Lake, or off with his wife Neni, who's origins are even more a mystery though Azlan will often recall her exploits at the inn.`
      }
    ],
    quote: "...and that was the last time I took Neni to the beach."
  },
  { 
    name: 'The Basement Rats', 
    image: 'https://missmab.com/Cast/Images/04_Rats.jpg',
    attributes: [
      { label: 'Name', value: 'Unknown save for the girl, Photophie' },
      { label: 'Nicknames', value: 'Rats' },
      { label: 'Age', value: 'Varied' },
      { label: 'Status', value: 'Varied' },
      { label: 'Family', value: 'Many' },
      { label: 'Species', value: 'Rats!' },
      { label: 'Hobbies', value: 'Games, Movies, Cards, Digging' },
      { label: 'Hair Colour', value: 'Varied' },
      { label: 'Eye Colour', value: 'Varied' },
      { label: 'Often Seen', value: 'In basements and cellars everywhere' },
      { label: 'Most known for', value: 'Occupying a basement niche' },
      { label: 'Favorite Food', value: 'Pop Tarts' },
      { label: 'Favorite Colour', value: 'Various' },
      { label: 'First Appearance', value: 'Comic #106' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `There is very little known about these little occupants of the Lost Lake Inn. They were discovered when Dan moved into the basement himself. However both Dan and they seem to get along on great terms and have set up a rather nice situation. They are rather friendly and social little rats although they are never seen outside of the basement itself. There may very well be more than meets the eye with them, but in the meantime they seem quite happy living their lives as basement rats.`
      },
      {
        title: 'History',
        content: `Perhaps the greatest mystery of all Lost Lake, second only to how Dan managed to turn the lake magenta for a week. No one knows of their past, or how they came to be in the basement. Asking them only makes them smirk and quickly change the subject.`
      }
    ],
    quote: "Uh oh... maybe we can hide it before he regains consciousness..."
  },
  { 
    name: 'Aliyka', 
    image: 'https://www.missmab.com/Cast/Images/04_Aliyka.jpg',
    attributes: [
      { label: 'Name', value: 'Aliyka' },
      { label: 'Nicknames', value: 'Ali, Ali-Cat, Lai' },
      { label: 'Age', value: '24' },
      { label: 'Status', value: 'Single/Adventuring' },
      { label: 'Family', value: 'None' },
      { label: 'Species', value: 'Phoenix/Feline' },
      { label: 'Hobbies', value: 'Adventuring, Gardening, Peace-campaigning' },
      { label: 'Hair Colour', value: 'Green' },
      { label: 'Eye Colour', value: 'Green' },
      { label: 'Often Seen', value: 'Frolicking in meadows' },
      { label: 'Most known for', value: 'Being the bringer of adventures.' },
      { label: 'Favorite Food', value: 'M&Ms' },
      { label: 'Favorite Colour', value: 'Green/Yellow' },
      { label: 'First Appearance', value: 'Comic #117' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Aliyka has always been an optimistic character. Even in the face of extreme peril and woe, Aliyka can often be found doing her best with a smile. An adventurer by nature, a peace-lover by heart, Aliyka is a very odd choice to be hired to handle an evil creature. Even though her methods are very effective, many people hire adventurers to do smashing and slaying, not spreading joy and peace. Because of this, Aliyka is often hired more as a messenger/delivery gal than a warrior although she will gladly go across the countryside for any reason if it means she can bounce through meadows. An odd character, but always a pleasant one.`
      },
      {
        title: 'History',
        content: `Aliyka's past is a bit unknown, though it is assumed she had a good one. Since a young age Aliyka had shown interest in being a go-between and treaty-maker. During her high school years Aliyka was head of the debate and peace department. After graduating, she then wandered to the kingdom of H-Ann where she learned the ways of the adventurer...although things like battle never really worked well for her. Despite that, she managed to graduate with flying colours and has since then been working freelance or for whoever will hire her.`
      }
    ],
    quote: "I'm sure he would give peace a try if you stopped trying to stab him..."
  },
  { 
    name: 'Amber', 
    image: 'https://missmab.com/Cast/Images/04_Amber.jpg',
    attributes: [
      { label: 'Name', value: 'Amber M. Panyko' },
      { label: 'Nicknames', value: 'Amber, Amber Gee' },
      { label: 'Age', value: '25' },
      { label: 'Status', value: 'Ebil (So evil it\'s misspelled!)' },
      { label: 'Family', value: 'None in the comic (save for mom cameos)' },
      { label: 'Species', value: 'Human' },
      { label: 'Hobbies', value: 'Drawing, Video Games, Ranting' },
      { label: 'Hair Colour', value: 'Dark Brown' },
      { label: 'Eye Colour', value: 'Brown' },
      { label: 'Often Seen', value: 'Being insane' },
      { label: 'Most known for', value: 'Making a moron of herself' },
      { label: 'Favorite Food', value: 'Buffalo Wings/Swedish Fish' },
      { label: 'Favorite Colour', value: 'Purple' },
      { label: 'First Appearance', value: 'Comic #44' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Some might say its egocentric for the creator to put themselves in their own comic. Then again, some people have that weird "pride" thing... which Amber has none of. The self-proclaimed creator of DMFA (though who's to say), Amber is often called in to answer questions or provide Dues Ex Machina... or to just screw over continuity all together for the sake of funny. Extremely lazy, Amber will often use tricks or excuses in order to make her job easier. All in all, it is unknown if Amber really is God of the DMFA universe, or if she is just pretending to be and hoping no one catches on.`
      },
      {
        title: 'History',
        content: `When a mommy loves a daddy... *SMACK*... ow.`
      }
    ],
    quote: "Wiku wiku wiku..."
  },
  { 
    name: 'Fluffy', 
    image: 'https://missmab.com/Cast/Images/04_Fluffy.jpg',
    attributes: [
      { label: 'Name', value: 'Fluffy D. Funni' },
      { label: 'Nicknames', value: 'Fluffy, Fluffster' },
      { label: 'Age', value: '7' },
      { label: 'Status', value: 'With Amber' },
      { label: 'Family', value: 'None' },
      { label: 'Species', value: 'Dog (?)' },
      { label: 'Hobbies', value: 'Reading, Games, Baseball/Softball' },
      { label: 'Hair Colour', value: 'Er... Grey?' },
      { label: 'Eye Colour', value: 'Black' },
      { label: 'Often Seen', value: 'Beating sense into Amber' },
      { label: 'Most known for', value: 'Beating Amber in general' },
      { label: 'Favorite Food', value: 'Unknown' },
      { label: 'Favorite Colour', value: 'White' },
      { label: 'First Appearance', value: 'Comic #126' },
    ],
    sections: [
      {
        title: 'Personality',
        content: `Behind every great person is usually another person telling them what idiots they are. And that person... er... thing is Fluffy. The more practical of the two, Fluffy often acts as the voice of reason or at least the voice of intelligence. It is often Fluffy's task to keep Amber from doing something really stupid or being too lazy. Sarcastic, cynical, and sometimes very blunt, Fluffy will hold no punches when it comes to saying how it is. It is unknown what lies underneath, both in personality and in physical traits. In fact, there is often a long running speculation over the gender of Fluffy. Asking often only ends up with lots bite-marks.`
      },
      {
        title: 'History',
        content: `Back in 6th grade, Amber originally started a comic called "Fluffy Funnies" and like all great 6th grade comics, it sucked badly. But the character itself, Fluffy, soon made a comeback as a sidekick since Amber needed to find one who would not be based off a real life person or as something that would cause copyright infringement. Since then, Fluffy has been acting as Amber's second in command.`
      }
    ],
    quote: "Beep beep. The stupid bus is here for you Amber."
  },
];

export const CastModal: React.FC<CastModalProps> = ({ isOpen, onClose, onNavigateToComic }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(castData[0]);
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'character'>('list');
  
  // Window width tracking for mobile detection (same as UnifiedComicViewer)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileLayout = windowWidth <= 768;

  const handleFirstAppearanceClick = (value: string) => {
    if (onNavigateToComic) {
      const match = value.match(/Comic #(\d+)/);
      if (match) {
        const pageNumber = parseInt(match[1], 10);
        onNavigateToComic(pageNumber);
        onClose(); // Close the modal after navigation
      }
    }
  };

  const handleFamilyMemberClick = (memberName: string) => {
    // Handle special case mappings
    let searchName = memberName;
    if (memberName.toLowerCase() === 'deebs/macy') {
      searchName = 'M.A.C.E. / Deathbringer';
    }
    
    const foundCharacter = castData.find(char => 
      char.name.toLowerCase() === searchName.toLowerCase() ||
      char.attributes.some(attr => 
        attr.label === 'Name' && attr.value.toLowerCase().includes(searchName.toLowerCase())
      )
    );
    if (foundCharacter) {
      setSelectedCharacter(foundCharacter);
    }
  };

  const renderFamilyValue = (value: string) => {
    // Split the value by commas and parentheses to identify potential character names
    const parts = value.split(/([(),])/);
    return parts.map((part, index) => {
      const trimmedPart = part.trim();
      
      // Skip empty parts, punctuation, relationship descriptors, and generic terms
      if (!trimmedPart || trimmedPart.match(/^[(),]$/) || 
          trimmedPart.match(/^(Brother|Sister|Mother|Father|Daughter|Son|Uncle|Aunt|Niece|Nephew|Wife|Husband|Owner|Adopted|Second-|Step-|Kin|Unknown|None|Varied|Many)$/i)) {
        return <span key={index}>{part}</span>;
      }
      
      // Check if this part contains a character name in our database
      let searchName = trimmedPart;
      if (trimmedPart.toLowerCase() === 'deebs/macy') {
        searchName = 'M.A.C.E. / Deathbringer';
      }
      
      const foundCharacter = castData.find(char => 
        char.name.toLowerCase() === searchName.toLowerCase() ||
        char.attributes.some(attr => 
          attr.label === 'Name' && attr.value.toLowerCase().includes(searchName.toLowerCase())
        )
      );
      
      if (foundCharacter) {
        return (
          <button 
            key={index}
            onClick={() => handleFamilyMemberClick(trimmedPart)}
            className="px-1 py-0.5 bg-comic-accent/20 rounded hover:bg-comic-accent/40 transition-colors focus:outline-none focus:ring-2 focus:ring-comic-accent/50"
            title={`View ${trimmedPart}'s profile`}
          >
            {part}
          </button>
        );
      }
      
      return <span key={index}>{part}</span>;
    });
  };

  useEffect(() => {
    let timeoutId: number;
    if (isOpen) {
      setIsRendered(true);
      setSelectedCharacter(castData[0]);
      setMobileView('list'); // Always start with list view on mobile
      
      // Save current scroll position and scroll to top
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      
      // Add modal-open class to body to prevent background scrolling
      document.body.classList.add('modal-open');
      
      timeoutId = window.setTimeout(() => {
        setIsVisible(true);
      }, 20);
    } else {
      setIsVisible(false);
      
      // Remove modal-open class from body
      document.body.classList.remove('modal-open');
      
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      
      timeoutId = window.setTimeout(() => {
        setIsRendered(false);
        setLightboxImage(null);
        setMobileView('list');
      }, 300);
    }
    
    return () => {
      window.clearTimeout(timeoutId);
      // Cleanup: ensure class is removed if component unmounts while open
      if (isOpen) {
        document.body.classList.remove('modal-open');
        const scrollY = document.body.style.top;
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isOpen]);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    if (isMobileLayout) {
      setMobileView('character'); // Switch to character view on mobile
    }
  };

  useEffect(() => {
    if (isRendered) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !lightboxImage) {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isRendered, onClose, lightboxImage]);

  if (!isRendered) {
    return null;
  }

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/70 z-50 p-4 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <div 
          className={`bg-comic-module/95 rounded-lg shadow-xl w-full max-w-6xl h-[85vh] flex flex-col p-6 transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${isOpen ? 'pointer-events-auto' : ''}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Mobile: Show back button and dynamic title */}
          {isMobileLayout && mobileView === 'character' ? (
            <div className="mb-4">
              <button
                onClick={() => setMobileView('list')}
                className="mb-4 px-4 py-2 bg-comic-accent text-white rounded-md transition-colors duration-200 hover:bg-comic-accent/80 flex items-center gap-2 w-fit"
              >
                ← Back to Cast List
              </button>
              <h2 className="text-2xl font-bold text-comic-light">{selectedCharacter?.name}</h2>
            </div>
          ) : (
            <h2 className="text-3xl font-bold text-comic-light mb-4 flex-shrink-0">Cast of Characters</h2>
          )}
          <div className="flex-grow flex flex-col lg:flex-row gap-6 overflow-hidden min-h-0">
            {/* Character List - Hidden on mobile when viewing character */}
            <div 
              className={`${isMobileLayout && mobileView === 'character' ? 'hidden' : 'block'} w-full lg:w-1/4 flex-shrink-0 bg-comic-secondary rounded-lg p-6 overflow-y-auto max-h-full`}
            >
              <div className="space-y-1">
                {/* Main Characters Section */}
                <div className="px-2 py-2 text-xs font-bold text-comic-light/80 uppercase tracking-wide border-b border-comic-accent/30 mb-2">
                  Main Characters
                </div>
                {castData.slice(0, 2).map((character) => (
                  <button 
                    key={character.name}
                    onClick={() => handleCharacterSelect(character)}
                    className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
                      selectedCharacter?.name === character.name 
                      ? 'bg-comic-accent text-white font-semibold' 
                      : 'text-comic-light/80 hover:bg-comic-dark/80'
                    }`}
                  >
                    {character.name}
                  </button>
                ))}
                
                {/* Supporting Characters Section */}
                <div className="px-2 py-2 text-xs font-bold text-comic-light/80 uppercase tracking-wide border-b border-comic-accent/30 mb-2 mt-4">
                  Supporting Characters
                </div>
                {castData.slice(2, 10).map((character) => (
                  <button 
                    key={character.name}
                    onClick={() => handleCharacterSelect(character)}
                    className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
                      selectedCharacter?.name === character.name 
                      ? 'bg-comic-accent text-white font-semibold' 
                      : 'text-comic-light/80 hover:bg-comic-dark/80'
                    }`}
                  >
                    {character.name}
                  </button>
                ))}
                
                {/* Random Goers Section */}
                <div className="px-2 py-2 text-xs font-bold text-comic-light/90 uppercase tracking-wide border-b border-comic-accent/30 mb-2 mt-4">
                  Random Goers
                </div>
                {castData.slice(10, 23).map((character) => (
                  <button 
                    key={character.name}
                    onClick={() => handleCharacterSelect(character)}
                    className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
                      selectedCharacter?.name === character.name 
                      ? 'bg-comic-accent text-white font-semibold' 
                      : 'text-comic-light/80 hover:bg-comic-dark/80'
                    }`}
                  >
                    {character.name}
                  </button>
                ))}
                
                {/* God... Er... Real Worlders Section */}
                <div className="px-2 py-2 text-xs font-bold text-comic-light/80 uppercase tracking-wide border-b border-comic-accent/30 mb-2 mt-4">
                  God... Er... Real Worlders
                </div>
                {castData.slice(23).map((character) => (
                  <button 
                    key={character.name}
                    onClick={() => handleCharacterSelect(character)}
                    className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
                      selectedCharacter?.name === character.name 
                      ? 'bg-comic-accent text-white font-semibold' 
                      : 'text-comic-light/80 hover:bg-comic-dark/80'
                    }`}
                  >
                    {character.name}
                  </button>
                ))}
              </div>
            </div>
            {/* Biography Panel - Show always on desktop, only when character selected on mobile */}
            <div 
              className={`${isMobileLayout && mobileView === 'list' ? 'hidden' : 'block'} w-full lg:w-3/4 bg-comic-secondary rounded-lg p-6 overflow-y-auto max-h-full`}
            >
              {selectedCharacter ? (
                <div className="space-y-6">
                  {/* Header with portrait and name - Different layout for mobile */}
                  <div className={`flex gap-6 items-start ${isMobileLayout ? 'flex-col items-center text-center' : 'flex-col md:flex-row'}`}>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => setLightboxImage(selectedCharacter.image)}
                        className="block w-48 h-48 rounded-lg border-4 border-comic-accent overflow-hidden focus:outline-none focus:ring-4 focus:ring-comic-accent focus:ring-inset group"
                        aria-label={`View larger image for ${selectedCharacter.name}`}
                      >
                        <img
                          src={selectedCharacter.image}
                          alt={`Portrait of ${selectedCharacter.name}`}
                          className="w-full h-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                        />
                      </button>
                    </div>
                    <div className="flex-grow">
                      {!isMobileLayout && <h3 className="text-3xl font-bold text-comic-light mb-4">{selectedCharacter.name}</h3>}
                      {selectedCharacter.attributes.length > 0 && (
                        <div>
                          <h4 className="text-lg font-bold text-comic-light mb-3 border-b border-comic-accent/30 pb-1">Character Details</h4>
                          <div className="space-y-2 text-sm text-comic-light/80">
                            {selectedCharacter.attributes.map(attr => (
                              <div key={attr.label} className="flex">
                                <span className="font-semibold text-comic-light/80 w-32 flex-shrink-0">{attr.label}:</span>
                                <span className="flex-grow">
                                  {attr.label === 'First Appearance' && attr.value.includes('Comic #') && onNavigateToComic ? (
                                    <button 
                                      onClick={() => handleFirstAppearanceClick(attr.value)}
                                      className="px-2 py-1 bg-comic-accent/20 rounded hover:bg-comic-accent/40 transition-colors focus:outline-none focus:ring-2 focus:ring-comic-accent/50"
                                      title={`Navigate to ${attr.value}`}
                                    >
                                      {attr.value}
                                    </button>
                                  ) : attr.label === 'Family' ? (
                                    <span className="inline">{renderFamilyValue(attr.value)}</span>
                                  ) : (
                                    attr.value
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Biography sections */}
                  {selectedCharacter.sections.map(section => (
                    <div key={section.title} className="border-t border-comic-accent/20 pt-4">
                      <h4 className="text-lg font-bold text-comic-light mb-3 border-b border-comic-accent/30 pb-1">{section.title}</h4>
                      <p className="text-comic-light/80 leading-relaxed text-justify">{section.content}</p>
                    </div>
                  ))}

                  {/* Character Quote */}
                  {selectedCharacter.quote && (
                    <div className="border-t border-comic-accent/20 pt-4">
                      <div className="bg-comic-dark/50 rounded-lg p-4 border-l-4 border-comic-accent">
                        <h4 className="text-sm font-bold text-comic-light mb-2">{selectedCharacter.name}'s Quote:</h4>
                        <p className="text-comic-light italic text-lg">&ldquo;{selectedCharacter.quote}&rdquo;</p>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-comic-light/70">Select a character to see their biography.</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-6 flex-shrink-0">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-comic-accent text-white rounded-md transition-colors duration-200 hover:bg-comic-accent-hover"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <EnhancedImageViewer
        isOpen={!!lightboxImage}
        src={lightboxImage || ''}
        alt={selectedCharacter ? `Full view of ${selectedCharacter.name}` : ''}
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
};