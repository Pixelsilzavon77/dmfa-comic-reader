export interface SpeciesAttribute {
  label: string;
  value: string;
}

export interface SpeciesSection {
  title: string;
  content: string;
}

export interface Species {
  name: string;
  type: 'race' | 'class';
  image?: string;
  attributes: SpeciesAttribute[];
  sections: SpeciesSection[];
  hidden?: boolean;
}

const placeholderContent = 'Information about this species is not yet available.';
const placeholderSection = [{ title: 'Overview', content: placeholderContent }];

export const demonologyData: Species[] = [
  // Races
  {
    name: 'Angel',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_Angel.gif',
    attributes: [
      { label: 'Wings', value: 'Feather-based' },
      { label: 'Markings', value: 'Bright coloured' },
      { label: 'Magic', value: 'Light-oriented' },
      { label: 'Abilities', value: 'Heightened speed/senses' },
      { label: 'Diet', value: 'Omnivorous (lean carnivorous)' },
      { label: 'Lifespan', value: 'Up to 1500 years' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `While not as actively rampaging the countryside as their demonic cousins, a fair deal of trouble has been caused at the hands of the angel race. This is primarily due to the angel-races tactics: where a demon would go in themselves and burn a city to the ground, an angel would manipulate it so that someone else would do the work for them. It should be noted that the "angel" term is primarily aesthetic. With feathered wings and light-based magic, the angel race is a master of convincing other races of their good intentions. However deep beneath the lovely exterier often lies the mind that can rival even the most devious of the demon-race.

The angel race's entire mantra seems to focus on power. Some will choose the path of knowledge and can often be seen as the protectors of large libraries, where others may become a guardian of a village where the villagers offer them tribune for their service. There have been many cases of kindly angels but usually temptations are too strong a force and most angels cannot resist an offer of an item of great power or a scheme involving a gain of some sort.

There are no known cities belonging to the angel-race and by nature the entire race seems to be highly solitary unless a certain cause brings them together. Angels of a feather seem to not flock together as they are highly competitive and constantly try to get the upper hand of the other, causing massive fights.`
      },
      {
        title: 'History',
        content: `The angel race first appeared around the same time as the demon race, and it is almost rumoured that they were caused from a similar event and are merely the two magical representations of light and darkness. When the first council was created, it was an angel-race who was behind most of the diplomacy and acting between races that would often be at edge with eachother. Most well-known historic figures in the angel race had something to do with diplomatic means despite the many tragic events that have unfolded at the hands of a craftier angel. Some speculate this is due to future generations of angels removing the evidence of the previous incidents from general history in order to further gain their own glory.`
      },
      {
        title: 'Strengths',
        content: `Angels are generally much faster in both reflexes and thinking than many other races. Many are also capable of making their skin razor sharp and hard. With the aid of light-magic, many of them are the master of some highly powerful spells.`
      },
      {
        title: 'Weaknesses',
        content: `As mentioned, most Angels cannot resist the lure of power and will often offer aid in exchange for items of power. The angel race is often harder to find weak-points as they tend to work in the background of their schemes and simply disappear when things go wrong.`
      },
      {
        title: 'Notable Figure: Akaen',
        content: `Age 612, Akaen is the current angel-representative of the Beings/Creature council and possibly one of the nicest members of the council(or at least appears to be). Charismatic, curious, and containing a sharp wit, he often ends up acting as the one to smooth out the worst wrinkles in arguments between races. It is also known he is one of the largest investors in many of the technologies beings have been making. One could almost say a good deal of the industrial age in Furrae was thanks to Akaen's support.`
      }
    ]
  },
  {
    name: 'Demon',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_Demon.gif',
    attributes: [
      { label: 'Wings', value: 'Bat-based' },
      { label: 'Key Features', value: 'Horns' },
      { label: 'Markings', value: 'Dark coloured' },
      { label: 'Magic', value: 'Dark-oriented' },
      { label: 'Abilities', value: 'Heightened speed/senses' },
      { label: 'Diet', value: 'Omnivorous (lean carnivorous)' },
      { label: 'Lifespan', value: 'Up to 1500 years' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `The demon race is probably one of the more commonly known of the creature races. Most likely this is due to their tendancy towards showing off and causing great amounts of trouble. Unlike their angelic cousins, the demon race is often up front and to the point, and prefer to go in and handle things themselves (usually violent) than enact any form of diplomacy. The wings of a demon will usually be batlike or leathery, and it isnt uncommon for them to have horns and claws. And while there are plenty of cases of good-natured demons, by and large the race isn't that afraid to use them whenever the chance arises.

Like their light-magic counterparts, Demons seem to go by a rule of power. However their power seems to derive more from chaotic forces and so it isn't uncommon for many demons to go about doing it in the easiest way necessary. While most of the creature races get along well with eachother, arguments and battles over a rogue demon intruding on another creatures area and messing it up isn't uncommon.

There are no known cities of the demon race, though small clans and communities seem to exist. Most demons seem to share a sense of family and will often band together for long periods of time. Even afterwards demons seem to share a lot more close ties to their kin.`
      },
      {
        title: 'History',
        content: `The demon race first appeared around the same time as the angel race, and it is almost rumoured that they were caused from a similar event and are merely the two magical representations of light and darkness. While the history books have many cases of demon's influencing history (often in a very bad way), it is also said that it was the demon race who was one of the prime supporters of a Creature/Being council. As a side mention, many of the greatest spies and assissins in Furrae's history are attributed to the demon race. Whatever their motives may be, the demon race does what they do well.`
      },
      {
        title: 'Strengths',
        content: `Most demons have lightning fast reflexes and the ability to turn their skin razor sharp and diamond hard. They also seem to have an almost unlimited supply of endurance to aid them in whatever they hope to achieve. The masters of dark magic, it isn't uncommon for them to seem to almost disapeer into the shadows.`
      },
      {
        title: 'Weaknesses',
        content: `As a demon grows older, it gets a lot harder to kill. Some even wonder how demons die in general since near the end of their lives they often seem indestructable by normal means. However fast and strong they may be though, most demons can be killed by various means if their opponent is clever or strong enough. Because of this, most demons don't have a real notion of revenge or vengeance if one of their own kind is slain. After all, by their own belief system, if someone is able to defeat them, that other creature or being is obviously worthy.`
      },
      {
        title: 'Notable Figure: Nicky',
        content: `Age 56,720, Nicky is by far the oldest demon in the demon-race. One of a demons goal is often to achieve immortality or extended life. Most demons are easily able to add a few thousand years to their lives. However Nicky, by fate or by accident, managed to come across some force so powerful that she has been able to retain the same youthful appearance without any signs of change for well over the average years. Unfortunately as a side effect, she has also lost her ability to retain the wisdom that would come with age and thus A) Has no rememberance or knowledge of how she came into this power and B) loses all memories older than 100 years. This can be seen as a blessing or a curse given the point of view.`
      }
    ]
  },
  {
    name: 'Mer',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_Mer.gif',
    attributes: [
      { label: 'Eyes', value: 'Lidless' },
      { label: 'Key Features', value: 'Large fins, multiple spines' },
      { label: 'Magic', value: 'Water-oriented' },
      { label: 'Lifespan', value: 'Unknown' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `Like the Insectis race, there is not much actually known about the Mer race as the majority of the race tends to keep below in secret cities out of sight of normal means. However unlike the Insectis race, the Mer race shows a great deal more curiosity and interest in the outside world and has recently begun to come more in contact with the land-dwelling species.

Masters of the oceans, the Mer hold the concept that whatever is beneath the water belongs to them, and as a result any ship that is sunk becomes their property and any person who is foolish enough to try to adventure under the waves often finds themselves at their mercy. The Mer also seem to have a habit of kidnapping those who go swimming at the beach now and again though the Mer race denies it everytime. In order to avoid any hassle, many ships will often charter deals with the Mer race as "insurance" and very recently the Mer race has allowed some supervised visits to one of their cities though the actual trip there was shrouded in mystery.

While very little is known about the Mer race, it is known they are run via royalty. Another thing is that the Mer race have two sets of hands; the outer resembling large webbed fingers which act as fins and then a second set beneath inside which is smaller and used for gripping and fine details. The Mer's language is untranslatable, as it sounds more like strange vibrations due to the lack of air to speak. Though many Mer are able to train the vibrations to mimic other languages.

The Mer race is able to alter its form slightly in order to move about on land by taking a serpantine lower half...however they tend to avoid being on land for more than a few days without some visits back to water. An overall interesting race, there is still a lot left unknown.`
      },
      {
        title: 'History',
        content: `There is little recorded history of the Mer race to the outside world. They joined the Councils only recently and seem to have a strong ally of the Insectis race. This is likely due to that they both run self-contained kingdoms that have no real basis of infringing on eachother. The Mer race seems quite happy to keep to their watery kingdom as the Insectis to their underground. The only real recorded event in normal history is an old legend of a Mer helping to save a ship carrying precious cargo that was stranded on the ocean. In exchange for her aid, she asked that the Captain promise to be hers and to live with her in her kingdom. Agreeing, the Mer created a current that quickly took the ship to a nearby harbor. Once at shore however the Captain took off inland along with his crew and the cargo never intending to keep his deal. After a week none of the crew was left alive, as each seemed to have drowned in his sleep.`
      },
      {
        title: 'Strengths',
        content: `In the water, the Mer are a force to be reckoned with. Very fast, and a few have poisoned barbs, they wield water magic unmatched by any race with the possible exception of Fae.`
      },
      {
        title: 'Weaknesses',
        content: `On land they are much weaker, and seem to dislike being out in the sunlight for very long.`
      },
      {
        title: 'Notable Figure: Scarlet',
        content: `No one is quite sure of her age, or much about her. When the Mer race first allowed someone to visit their realm, the being was allowed to bring a film camera to document what he saw. Overnight the entire world of Furrae became entranced by the seemingly magical kingdom beneath the ocean and one notable sight was a particular Mer who allowed a tour of the palace. Later it was discovered that she was actually one of the royal children though her name was completly unpronouncable. She was nicknamed "Scarlet" topside due to her colouring and became somewhat an icon celebrity when it comes to the Mer race. That is really all that is known about her.`
      }
    ]
  },
  {
    name: 'Cubi (Succubus/Incubus)',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_Cubi.gif',
    attributes: [
        { label: 'Primary Trait', value: 'Highly morphable appearance, emotional manipulation.' },
        { label: 'Key Features', value: 'Multiple sets of wings, unalterable clan markings.' },
        { label: 'Magic', value: 'Skilled in both light and dark magic.' },
        { label: 'Lifespan', value: 'Up to 1000 years, extendable with power.' },
        { label: 'Sustenance', value: 'Absorbing emotional energy, dream energy, or souls.' },
    ],
    sections: [
        {
            title: 'General Overview',
            content: `The Cubi race seems to fall into a strange sideline between the Angel and the Demon race...so much that it is often a joke that the Cubi race was created because the Angel and Demon race got along "too" well. Whatever the case may be, the Cubi are both highly skilled in light and dark magic and their wings will come in a variety of styles. Though perhaps the most unique feature of this race is that they have a second set of wings atop their head. It is unsure if they are simply decoration or actually do anything(no Cubi would dare let them get cut off alive), though they manifest around the same time a Cubi comes into power. There is also rumours that upon reaching a particular level of power, a Cubi gains a third set of wings. This is currently in debates though among Creatures as if any do exist, they tend to keep well-hidden.

Unlike many of the other races, Cubi do no need to eat to gain energy. In fact their primary method of gaining power and energy is by either harnessing the emotions of beings and creatures around them, entering their dreams and harnessing energy that way, or just out and out stealing the soul out of some hapless beings body. And while many Cubi are content to live lives peacefully simply absorbing energy, quite a few Cubi will gladly go for the power boost that requires a bit of cruelty but gets more results a lot faster.

In a sense the Cubi are what they eat, as they are very emotional creatures. They also seem to have a soft spot for the finer things in life so seeing a cubi Actor or a Cubi working for a powerful rich Lord isn't uncommon. Much like their demonic cousins, Cubis seem intent on gaining power as it not only increases their lifespan and allows them special abilities, it is a prime focus of their clans goals. All cubis belong to particular clans, and their symbol appears soon after the Cubi begins to use magic. It is the one marking a Cubi can't alter thus a good way to spot a cubi would be to find their marking.`
        },
        {
            title: 'History',
            content: `Despite their ability to outlive many other creatures, the Cubi race is relatively young. Their first notable appearance was around the time Beings began developing civilizations so many Creatures assume the Cubi are a somewhat biproduct of this. Regardless, many Cubi have been the inspirational muses to some great achievement...though many more Cubi have been the result of some very nasty events.`
        },
        {
            title: 'Strengths',
            content: `Cubi are the masters of altering their physical appearance, and their wings can often sprout tendrils (a good note would be that certain clans have particular tendril styles as well as a marking). They are masters of emotional manipulation and can often read minds. They are strongest when in the dreams of others and even outside show a good amount of skills.`
        },
        {
            title: 'Weaknesses',
            content: `Cubi tend to be highly inexperienced at battles and highly egotistical... thus often leading them to underestimate their opponents. They also tend to have short attention spans. Most Cubi can die from normal means unless they are a certain power level.`
        },
        {
            title: "Notable Figure: Fa'Lina",
            content: `Age 9,288, Fa'Lina is the head-mistress of the Succubus and Incubus Academy (SAIA for short). Before her time, most Cubi were taught simply by their clans teachers and were often sent out into the world with not nearly the experience or time to survive the growing number of adventurers. Before the Academy, most Cubi were quite crude in their methods as many of the demon race. Fa'Lina, sensing how their entire race was beginning to be threatened, banded together some of the most intelligent and renowned Cubi teachers she could find, and she formed the first and only Cubi school which has to this day remained safe and hidden from all other races.

SAIA is generally the only place where the various clans(some of which have long-standing grudges) will gather on neutral terms in the pursuit of education. Employing various classes and cultures, the Cubi race evolved rapidly from a dangerous threat to dreams and beings...to an even greater threat to dreams and beings. But at least its an attractive cultured well-dressed threat.`
        },
        {
            title: 'Extended Information',
            content: `<p class="text-comic-light/90 mb-4">For more detailed information discovered through the comic series:</p>
<div class="space-y-3">
<button class="cubi-link w-full bg-comic-accent hover:bg-comic-accent/80 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200" data-target="Cubi - Abilities & Powers">
→ Abilities & Powers
</button>
<button class="cubi-link w-full bg-comic-accent hover:bg-comic-accent/80 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200" data-target="Cubi - Clans & Society">
→ Clans & Society
</button>
<button class="cubi-link w-full bg-comic-accent hover:bg-comic-accent/80 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200" data-target="Cubi - Detailed History">
→ Detailed History
</button>
</div>`
        }
    ]
  },
  // Hidden Cubi sub-entries
  {
    name: 'Cubi - Abilities & Powers',
    type: 'race',
    hidden: true,
    attributes: [
      { label: 'Primary Sustenance', value: 'Emotional energy (passive absorption)' },
      { label: 'Advanced Feeding', value: 'Dream manipulation, soul consumption' },
      { label: 'Mental Powers', value: 'Automatic thought-reading, dangerous deep mind-reading' },
      { label: 'Physical Powers', value: 'Wing-tentacles, full shapeshifting, clothing conjuration' },
      { label: 'Biological Changes', value: 'Eliminates need for food, sleep, breathing' },
    ],
    sections: [
      {
        title: 'Feeding Mechanisms',
        content: `Instead of relying on physical sustenance, full-fledged Cubi feed off of energy, primarily drawn from emotions broadcast from others. Cubi can also feed off of energy produced by dreams. Cubi are attuned to particular emotions; their preferences normally depend on clan affiliation but are sometimes affected by personal inclinations.

When inexperienced Cubi come into power, they gradually become more attuned to emotions and easily become overwhelmed by the overflow of stray thoughts and feelings. Shortly after these symptoms emerge, Cubi must learn to erect a mental filter to block out the surplus of rogue energy and only filter in the desired amount.

As their biological age increases, the amount of energy needed to keep them young will increase correspondingly. The natural lifespan of a Cubi is probably determined by this, since it will ultimately reach a point where the energy required to sustain their metabolism exceeds the input from passive emotion absorption.`
      },
      {
        title: 'Soul Consumption',
        content: `Cubi also have a reputation for eating the souls of their prey, and it is most likely for this reason that they are greatly feared by Beings. The consumption of souls is not necessary for a Cubi's survival, although it will greatly increase their powers and lifespan. Unlike their passive emotion feeding (which is a natural trait), Cubi employ active magical processes to feed on souls.`
      },
      {
        title: 'Mental Abilities',
        content: `Mind-reading is divided into separate categories. Thought-reading is an automatic skill that comes naturally to many Cubi. When others with unprotected minds think, Cubi can hear that transmitted thought as though it is being spoken aloud. However, most Cubi regard this as an inconvenience and filter out all but a few key words.

Mind-reading, alternatively, is an extremely dangerous process that puts both participants at risk. It is insanely tedious and complex, with high fatality rates. Generally, mind-reading is only used by the desperate when torturing for important information has failed.`
      },
      {
        title: 'Dream Manipulation',
        content: `An alternate method of feasting on energy is to manipulate the dreams of a sleeping victim. Cubi are able to perform a technique called "dream-surfing." As the dreaming mind is unpredictable and prone to suggestion, Cubi must actively nudge the victim's thoughts into whatever desired direction. Despite the fact this ability is so imperfect, it is one of the more effective ways a Cubi can try garnering information from a sleeping subject.`
      },
      {
        title: 'Physical Transformation',
        content: `Cubi have highly morphable appearances; their wings, in particular, can easily be manipulated and shaped into weaponry and other forms. Initially these "wing-tentacles" are under unconscious control, but with experience Cubi can control them. In combat, the tentacles can be used as lassos to ensnare their prey, but they can also be sharpened into blades.

Cubi can also alter their entire appearances, although this is a complicated process that takes years to master. The only aspect of a Cubi's appearance they cannot change is their clan marking, which exists as a perpetually-present colorful symbol located somewhere on the body.`
      }
    ]
  },
  {
    name: 'Cubi - Clans & Society',
    type: 'race',
    hidden: true,
    attributes: [
      { label: 'Clan Inheritance', value: 'Based on emotional affinity, inherited from stronger parent' },
      { label: 'Clan Identification', value: 'Unalterable marking appears when magic develops' },
      { label: 'Typical Clan Size', value: '20-80 members for healthy clans' },
      { label: 'Living Tri-Wing Leaders', value: 'Only 7-12 clans still have active founders' },
      { label: 'Founder Indicator', value: 'Wing-tentacle heads show if founder lives' },
    ],
    sections: [
      {
        title: 'Clan Structure',
        content: `All Cubi belong to a Clan, whether they know it or not. Like clans and castes in human society, Cubi clans all have different lifestyles, normally centering on the emotional energy that they most easily accumulate. In addition, the clan a Cubi belongs to will influence which emotions they are most readily able to absorb.

The clans are not simply a family convention, but a physical attribute of a Cubi, inherited from the parent belonging to the more powerful clan. When a young Cubi starts to use magic on a regular basis, a marking in the form of their clan symbol will appear on a random part of their body. This clan marking is the one thing which a Cubi is unable to conceal via their shapeshifting powers.`
      },
      {
        title: 'Clan Founders & Tri-Wings',
        content: `It is implied that only tri-wing Cubi can actually found a 'true' clan. According to current information, only seven to twelve clans still have existing tri-wing founders.

Some clan members have small heads at the end of their wing-tentacles. This is believed to happen to the clan founder when they ascend to tri-wing status. A clan with its tri-wing leader still alive will have these heads on all members of the bloodline. If the founder is dead they will simply have basic tentacles.`
      },
      {
        title: 'Clan Conversion & Naming',
        content: `It is possible for Cubi to convert to another clan. This is not a trivial process and will usually result in a weakening of the Cubi's powers, even if the clan he or she is joining is more powerful. It can, however, increase the power of any children he or she subsequently has.

Cubi naming conventions tend to follow the name of the individual's clan: the name of the Cubi's clan is used as his or her last name.`
      },
      {
        title: 'SAIA Academy',
        content: `Approximately 7,000 years before DMFA, Fa'Lina created SAIA (Succubus and Incubus Academy) in order to educate and train Cubi so they could be prepared to face the outside world. SAIA is generally the only place where the various clans (some of which have long-standing grudges) will gather on neutral terms in the pursuit of education.`
      }
    ]
  },
  {
    name: 'Cubi - Detailed History',
    type: 'race',
    hidden: true,
    attributes: [
      { label: 'Race Origins', value: '~100,000 years ago (coinciding with Being civilizations)' },
      { label: 'Current Population', value: 'Less than 30,000 individuals in Furrae' },
      { label: 'Historical Conflicts', value: 'Mass clan extinctions, Dragon-Cubi War, inter-clan warfare' },
      { label: 'Lost Leadership', value: '400+ Tri-Wing founders killed in conflicts' },
      { label: 'Educational Reform', value: 'SAIA Academy established ~7,000 years ago' },
    ],
    sections: [
      {
        title: 'Origins & Early History',
        content: `The Cubi race was reportedly created around 100,000 years before the events in DMFA, but the details surrounding their origins are extremely ambiguous. Cubi appeared around the time Beings were developing civilizations, so a popular theory is that the race was a byproduct of this technological advancement.

Abel provided a brief summary of Cubi history describing when the race thrived purely on savagery and brutality. This provoked a war that resulted in the outright extinction of numerous clans; Fa'Lina's was among the casualties.`
      },
      {
        title: 'Major Conflicts',
        content: `There was also a Dragon and Cubi War between the Dragons and the Cubi, though it has only been mentioned once and it might be a separate conflict from the mass extinction. It is also known that some millennia ago there was a state of open warfare between many clans, apparently started by various Cubi who chose to eat the souls of other Cubi.

Siar Clan was obliterated by a Dragon over four hundred years before DMFA (400-846 years before), so in spite of any official conclusion to the war, murderous animosity still remains.`
      },
      {
        title: 'Modern Era & SAIA',
        content: `Approximately 7,000 years before DMFA, Fa'Lina created SAIA in order to educate and train Cubi so they could be prepared to face the outside world. Before the Academy, most Cubi were taught simply by their clans teachers and were often sent out into the world with not nearly the experience or time to survive the growing number of adventurers.

SAIA represents a major shift in Cubi culture from purely predatory behavior to more sophisticated approaches to survival and power acquisition.`
      }
    ]
  },
  {
    name: 'Undead',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_Undead.gif',
    attributes: [
      { label: 'Key Features', value: 'Missing and/or Damaged limbs' },
      { label: 'Eyes', value: 'Glowing' },
      { label: 'Magic', value: 'Dark-oriented' },
      { label: 'Lifespan', value: 'Unknown' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `One of the newest races to be accepted as a race, the Undead race has a lot of issues to work out. Probably the most avoided of all the races, it really is somewhat a shame as the Undead race is probably the nicest and most accepting race of creatures. This likely stems from the fact almost all the Undead were once living beings in some form and as such feel a slight tie to their non-magical kin.

The Undead do not need to eat, sleep, drink, or even breath. The magical forces that keep them animate have more or less put their entire internal structures in a form of stasis. The only exception is their brain which is needs to be in tact to function. While unable to reproduce normally, the Undead can gain more members to their race simply by infecting another race via a lethal bite. Simply being scratched or bitten by an Undead won't kill a person, if the person dies within 24 hours of the injury they will soon rise up as an undead themselves. Perhaps this is why the Undead race face a good deal of prejudice and persecution as many people fear that the simplest of touches from an Undead could cause them to become one of them.

It should be noted that the main reason the Undead don't eat is that all food tastes like nothing to them...with the only exception being living flesh. However the concept of eating a living being is often so repulsive to many undead that some commit re-suicide. This fact along with others only adds to the general creepiness of the race. The Undead have recently gathered and formed an island city called Trik'na Island, where many Undead often leave to avoid an untimely demise at adventurers. Without needing to eat or sleep, the city is actually quite prosperous and welcome to visitors though very few ever go out of fear/dislike.`
      },
      {
        title: 'History',
        content: `The Undead race is the most well-known case of species creation when a powerful Demon decided to use a spell to cause the very dead of the planet to rise and form into an unstoppable army. However he made a major oversight in that while the dead did rise up, they still retained all memories and personalities of their former lives thus many had no real desire to become a grunt in an army against their living friends. However many beings were very uncomfortable with the concept of their dead relatives and friends coming back and so the majority of Undead left their homeland in search of a place to call home. However there are a few Undead who still make their home and have somewhat reclaimed their old "lives".

Another important event was when a cult of Undead grouped together and went about in an attempt to convert the countryside. This short-lived but infamous event still lurks on the minds of many beings and only helped to further wedge a gap between the races.

The Undead is the second of the Creature races to be accepted into the Creature council instead of joining when it started.`
      },
      {
        title: 'Strengths',
        content: `The Undead have no need to eat, breathe, sleep, and have almost an unending supply of endurance. They are also able to fully function even if missing a limb or three. Since they are a new race, only existing for a couple hundred years, no one is sure how long an individual will last. However once undead, the process of decay seems to halt in 98% of the cases, so it is likely they could live as long as many of the other Creature races.`
      },
      {
        title: 'Weaknesses',
        content: `The Undead feel no pain, and in some cases feel nothing at all. This can seem like a bonus, but it is quite frustrating to lose a hand and not even know it is missing. While now capable of magic, the Undead are highly prone to re-dying like any other being if their head is properly damaged.`
      },
      {
        title: 'Notable Figure: Rachel-Rebecca the Third',
        content: `Age 60 (Alive 26, Dead 34), Rachel was attending law school and had a promising future of being a top lawyer...when she sadly became the victim of a terrible and horrendous murder. Left abandoned in a field, it was to her surprise that she arose back up due to the spell. Thanks to her quick thinking, she was able to enlist the aide of her friend and classmate Moira Den to become the first being to successfully win a case over her own murder. Rachel then went on to form the legal workings needed to acknowledge the Undead race as an actual race. It is also her doing to put a severe ruling against any future attempts of species creation.`
      }
    ]
  },
  {
    name: 'Dragon',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_Dragon.gif',
    attributes: [
      { label: 'Size', value: 'Usually large' },
      { label: 'Features', value: 'Scales with horns and/or hair' },
      { label: 'Appearance', value: 'Various Colours' },
      { label: 'Magic', value: 'Various, often breath weapons' },
      { label: 'Defense', value: 'Impenetrable hides' },
      { label: 'Lifespan', value: 'Unknown (extremely long)' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `The dragon race is likely one of the oldest and most powerful races in the land of Furrae (The only thing making it an unsure victory being that the Fae aren't so forthcoming with their race history). A single dragon has been known to have the lifespan ten times that of a demon or an angel, and many a dragon has seen the rise and fall of civilizations in their lifetime. Dragons are often diverse in various shapes and sizes, and quite a few have the ability to alter their form to become the size of a regular being or creature. Perhaps it is due to their long lives that many of the dragon race prefer to shy away from the other races and society and instead stick to their own secret groups and organizations.

Or perhaps it is because most dragons and other races don't get along very well. Dragons are powerful, smart, and unfortunately in most cases, very aware of that fact. Because of this, many dragons have a very look-down (no pun intended) opinion of other races. Those that even bother to associate with other races are usually doing it for their own benefit and it isn't uncommon to hear of how a dragon double-crossed a powerful demon or cubi in order to further its own means. It really falls down to a dragon to dragon basis however as some dragons are more than friendly...albeit prone to accidentally landing on the wrong things or places...while others have their names in the history books for terrible deeds.

Dragons are for the most part solitary creatures. Any families or groups seem very adept at hiding themselves. It has been rumoured that the dragons, upon hearing of the Fae's kingdom, worked together in order to create their own special magic kingdom. If it is true or not, no dragon will say.`
      },
      {
        title: 'History',
        content: `As far as any race can remember, there have been dragons. For the most part dragons have been happy to be left to their own devices and not interfere much with the goings on of those around them. However with the rise of other races and their technology, a good deal of dragons have been getting involved in the world affairs. If this is because they feel it is their duty as "guardians of the planet" or because they feel they are "keeping the herd in check"... it really depends on which dragon one asks.`
      },
      {
        title: 'Strengths',
        content: `Dragons have quite a few strengths. Powerful magic plus the ancient knowledge of how to wield it combined with their own bodies natural defense... a dragon could easily take on an army of beings and even a few creature forces if it so chose. Oddly enough, the most often they get into fights are due to the giant gryphons as the gryphon is too territorial and the dragon is too proud to back down.`
      },
      {
        title: 'Weaknesses',
        content: `As far as physical weaknesses go, dragons have none. However due to their egos, most of them have a weakness against games and riddles. Also most dragons due to their age get eccentricities about collecting (or hoarding) certain items. If someone has an object a dragon desires, they almost always have a distinct advantage.`
      },
      {
        title: 'Notable Figure: Balorie',
        content: `Age 57,822, Balorie is considered a very young dragon. Most dragons spend a good bunch of years/centuries/eons trying to earn status, power, knowledge, objects, and respect...a process that is usually long and boring as is. Balorie however decided to side step the process and go a completely different route by creating the first recorded Dragon-creature truce in history. Thanks to Balorie, many Creatures and Beings were able to learn some of the mystic secrets that dragons have been privy to for eons. While this made Balorie unpopular with other dragons, they soon found her invaluable as she was able to gather information and objects in return that a dragon using a conventional method would have missed. Soon after many more dragons broke off and started to work with beings and other creatures. As for Balorie herself, she has long since disappeared... likely living off the wealth she earned on a sunny beach.`
      }
    ]
  },
  {
    name: 'Fae',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_Fae.gif',
    attributes: [
      { label: 'Key Features', value: 'Insectlike wings, antennae, forehead gem.' },
      { label: 'Markings', value: 'Bright colours and varied markings.' },
      { label: 'Magic', value: 'Multiple-oriented, highly proficient.' },
      { label: 'Lifespan', value: 'Effectively ageless ("a really long time").' },
    ],
    sections: [
      {
        title: 'General',
        content: `When it comes to magic, the Fae come in on top. Of all the races in Furrae, it seems the Fae are most in touch with the forces and as such wield its power a lot more. Due to magic's instability, this often ends up with the fae being a very diverse and often "eccentric" race. This also tends to account for the various bright colours a Fae will often have.

Despite being one of the oldest races, the Fae tend to be very good at keeping what they know a secret. The actual kingdom the Fae preside in seems to be on another plane of exhistance itself which makes travel to it impossible to any non-Fae. It is known that there is a monarchy involved, but from what has been gathered, the monarchy is more a figurehead and whimsy than any serious attempt at government.

The Fae are able to shift their appearance quite easily and one can often tell a Fae's mood based on their wings and antenna. Most don't try to press a Fae's mood though as angry Fae tend to equal large chunks of land exploding. Somewhat chaotic and some would even say a bit crazy, the Fae go about doing things based on their own whimsy. One thing of note is that many Fae(likely due to the fact they live so long) will often play roles and take on a story as if in a theatre play. Choosing a life of adventurer, lover, savage, they will set themselves into certain guidlines and limits to play out according to their chosen field. Whatever the role and limits are, the Fae sets themselves to that guide very strictly, so far as even allowing themselves to be "killed" for the sake of the great theatre. It does seem though that death on the plane of Furrae is only temporary as there have been many Fae who supposedly died but later return only to start a new role on a new stage...

No one is quite sure why the Fae do what they do, as they seem to be quite capable of wielding a great deal of power(much to the frustration of the other races). For whatever reason, the Fae are what they are.`
      },
      {
        title: 'History',
        content: `The Fae have more or less been a background in history, preferring to offer aid at the strangest times and places. It was because of them that the great Pheonix Temple in the desert exists as the Fae were the ones to create a magical fountain there providing limitless water. It was also the Fae's doing that for 200 years dandelions could grow on concrete. History seems full of things that happen because a Fae felt like it...`
      },
      {
        title: 'Strengths',
        content: `If it's magic, the Fae got a handle on it. No one has ever actively fought a Fae long enough to gauge any strength/weakness.`
      },
      {
        title: 'Weaknesses',
        content: `It seems all weaknesses will be intentional and as such will vary.`
      },
      {
        title: 'Notable Figure (Albanion)',
        content: `Age unknown, Albanion is one of the few Fae who seems to play an active part in the world of Furrae. A spokesperson for Peace, he has been one of the more active voices in trying to build bridges between the Creature and Beings race and it is likely due to him that the Beings/Creature Council hasn't fallen apart yet. It is unknown if this is simply him playing a role, as there is a ancient tablet describing an Albanion way back in ancient times who caused the destruction of an entire race of Mythos over who invented the yo-yo...`
      }
    ],
  },
  {
    name: 'Mythos',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_Mythos.gif',
    attributes: [
      { label: 'Limbs', value: 'Multiple (?)' },
      { label: 'Eyes', value: 'Multiple (?)' },
      { label: 'Size', value: 'Varying (tiny-huge)' },
      { label: 'Magic', value: 'Various-oriented' },
      { label: 'Key Feature', value: 'General oddness' },
      { label: 'Lifespan', value: '15,000 to 100,000+ years' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `The Mythos is a very hard to describe race since it consists of multiple races, with each group showing unique traits and abilities. Some might have multiple limbs, while others have multiple heads. They can be smaller than a breadbox and bigger than a house. Some are friendly and peaceful, while others give the demon race a run for its money as far as fierceness goes.

It is because of such diversity that many have a hard time dealing with Mythos as confusion can run abound. One gets the feeling that the Mythos race is almost a boiling pot of "wierd freaky critters" that don't fit into other easily identified categories. Regardless of their oddness, many Mythos are quite the potent magic users and seem to have very close ties to magical lore. Many of the spells in circulation where created and tested by various Mythos, as well as many of the magical devices that exist. Since no two groups are alike, many alliances are made and broken to non-Mythos groups. Some Mythos prefer the company of creatures while others prefer to live amongst urban cities of beings. While a good deal of Mythos do many great things for all societies, their darker nastier kin are often the most likely source of trouble alongside the demon race.`
      },
      {
        title: 'History',
        content: `For the longest time the Mythos race was engaged in civil war...back before many records were kept even. However, thousands of years ago a group of high-powered and intelligent leaders soon rose up and managed to unite the various races under a single race title thus allowing the Mythos a role in the councils. Sadly a darker part of that history was the inevitable genocide of the groups who didn't join into the alliance. Some would claim it was for the best, others not...such is the nature of history. Even today there are still echoes of Mythos races living in hiding from not only modern civilization, but their own kind out of fear despite the intolerance of such beginnings having long since faded away.`
      },
      {
        title: 'Strengths',
        content: `It tends to vary on the mythos. Some are super-fast, some can defy gravity, some can withstand extreme heat or cold...almost all have some element of magic but in the end it boils down to which group they are from.`
      },
      {
        title: 'Weaknesses',
        content: `Like strengths, it will vary greatly. Many adventurers hold a great deal of knowledge of the various mythos that exist and their strengths/weaknesses. So do many libraries...and both tend to be rather long-winded.`
      },
      {
        title: 'Notable Figure: Zingauru',
        content: `Age 24,729, Zingauru is one of the first creatures known to start recording the innerworkings of spells. Before then, most magic was a traditional hand-down from generation to generation. Thanks to Zingauru and other Mythos of his kind though, they were able to start rationalizing a basic science to the inner-workings of spells and how to manipulate the raw energy to create various new spells. His books on the matter are some of the most respected works regarding spellcraft and many magical schools use them now to teach students the art of magic.`
      }
    ]
  },
  {
    name: 'Insectis',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_Insectis.gif',
    attributes: [
      { label: 'Exoskeleton', value: 'Hard' },
      { label: 'Key Features', value: 'Large antenni, claws/stinger' },
      { label: 'Magic', value: 'Earth/Fire-oriented' },
      { label: 'Diet', value: 'Vegetarian' },
      { label: 'Lifespan', value: 'Varies by caste (13-900+ years)' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `It isn't too hard to guess where the Insectis race got it's name from. A large hivelike civilization, the Insectis race lives deep underground in secret catacombs. There is not a good deal of information about them as they are one of the most antisocial races of all Creatures, only coming to the surface to trade with select few or engage in important council meetings. The only time the Insectis even cross the attention of anyone is when mining companies are unfortunate enough to find themselves too close to an Insectis tunnel. The punishment for infringing on their territory is severe with few to no survivors.

The Insectis view the underground world as their entire kingdom, and any who dare enter it a tresspasser (save for particular sections which are given allowance by them) It is known that there is a Queen (or Queens?) who rules over the entire group but the actual rulings and innerworkings are left a mystery. For the most part, the race is quite happy to leave the surface to those above and to be left alone in peace.

It is known however the Insectis love glittering things like gold and gems, so it isn't uncommon for them to be found mining in the very areas a would-be hotspot is. There is only one thing the race seems to adore more than gold and jewels, and that is feathers. The softness and bright colours seem to excite most Insectis and they are most happy to trade riches of some wealth in exchange for rare and exotic feathers. It is also for this reason most winged races tend to avoid going underground since many a time an adventurer with lovely wings has turned up missing around the Insectis.`
      },
      {
        title: 'History',
        content: `The Insectis don't have a much recorded history available to the outside world. They seem on average to dislike and avoid alliances and contact with most races save for the necessary ones. The only exception to this rule is the Mer race, which the Insectis seem to have a very friendly relationship and alliance with. Underground there are quite a few water passageways built to allow the Mer race to travel to various locations. Many trade practices formed by other races with the Insectis were often done by the Mer race's suggestion.`
      },
      {
        title: 'Strengths',
        content: `The Insectis can take quite alot in their element. Able to withstand extreme temperatures, lack of air, massive pressure...they are built to handle the worst that the underground can offer. They also show an amazing ability to evolve and adapt to their situation in a single generation.`
      },
      {
        title: 'Weaknesses',
        content: `Since there are few encounters with the race, weaknesses are hard to find. And any that are discovered seem to disapeer after a generation or so. It is known that many Insectis are single-minded without tact though, so they can also be incredibly frustrating. Thankfully most Insectis have little to no interest in other races thus any real problems with them have been next to none.`
      },
      {
        title: 'Notable Figure: ChkChkTia',
        content: `Age 244, ChkChkTia is one of the queens children who often acts as a speaker for the Queen's behalf since the Queen herself refuses to bother making an appearance herself. He seems on average to be the more polite and sympathetic of the Insectis speakers and it is because of him that any information on the Insectis race is known. A bit timid and seemingly paranoid despite being the Queen's favorite (this is only known because on average a Speaker for the Queen has a life expectancy of 2 meetings, where at ChkChkTia has been a visitor to the surface for over a hundred years). Not really a notable figure, but in the case of the Insectis, he is almost the only real figure the surface has to identify the race with...which might be the reason he is still about as what better image to present to the outside world than a friendly but meek Insectis.`
      }
    ]
  },
  {
    name: 'Were',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_Were.gif',
    attributes: [
      { label: 'Forms', value: 'Alternate forms (Human/default/primal)' },
      { label: 'Magic', value: 'Various-oriented magic' },
      { label: 'Abilities', value: 'Increased strength/endurance' },
      { label: 'Appearance', value: 'Average looks similar to beings' },
      { label: 'Lifespan', value: '75-100 years' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `Perhaps one of the most confusing and unknown races of creatures, the Were race is infamous for having three alternate forms: the standard default form similar to a being, a human form, and an animal form. A Were is able to shift between each form at their leisure though many rumours fly around about full moons. However little is known about the Were race since they are often the most difficult to detect. The Were race is also the race most likely to be intermingled with beings as many a Were prefers to keep their creature heritage a secret.

Most non-hiding Weres are often aggressive and territorial, sticking to large clans and usually forming tribal groups hidden away from normal societies. Being a Were is a genetic trait, and being bitten by a Were will more likely result in stitches than anything, much less 'turning into one'. It is suspected Weres started the myth in order to keep nosy groups away from their personal space.

A Were is often a highly decent spellcaster although their magic is less controlled than the other races. However in their primal form (ie: full animal) they seem to be highly potent and are able to command a dazzling array of spells that wouldn't be possible in their natural form. In inverse, their human form seems to be the negation of magic to the point that all magic cast upon a were in their human form becomes null.`
      },
      {
        title: 'History',
        content: `The Were race is nearly devoid of most historic events, most likely due to their decision to remain in the background or among beings. Any real historic events were caused from a Creature mistaking a Were for a being. To this date there isn't even a Were on the Creature-Being council.`
      },
      {
        title: 'Strengths',
        content: `In human form, a Were is immune to magic and any spells would simply dissipate around them. In normal form they usually have heightened senses that set them apart from regular beings as well as good spell control. In primal form they gain traits similar to their animal (thus a rabbit-Were would be very small and hard to hit as is) plus an increased ability in magic.`
      },
      {
        title: 'Weaknesses',
        content: `While immune to magic in human form, this also counts for healing magics and does not count the area around affected by magic. (As such, a magical ice spell can leave a Were unharmed, yet freeze the ground nearby with normal ice after a few minutes). Most Weres are generally being-like in their defenses thus can be killed by any standard means.`
      },
      {
        title: 'Notable Figure: Hahwru',
        content: `Age 37, Hahwru is the leader of an all-Were amazon tribe. Not really notable per se other than it is one of the few known groups of Were since most prefer to stay hidden from known records.`
      }
    ]
  },
  {
    name: 'Phoenix (A)',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_PhoenixA.gif',
    attributes: [
      { label: 'Hair', value: 'Flaming hair' },
      { label: 'Type', value: 'Avian' },
      { label: 'Coloring', value: 'Gold to Red' },
      { label: 'Gender', value: 'Always female' },
      { label: 'Diet', value: 'Vegetarian' },
      { label: 'Lifespan', value: 'Unimportant (immortal through rebirth)' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `The Phoenix A race is composed of 42 individuals who all reside in various temples scattered through the lands of Furrae. In a way, the Phoenix race is considered an immortal race...for as soon as one "dies", it is reborn somewhere else in the world. That Phoenix will then travel back to whichever temple is the farthest, learning and researching new things about the world on the way. It's for that reason, along with their own oracle nature, that the Phoenix race is one of the most intellectual races. Whenever any creature or being requires an answer, they will usually seek out a Phoenix oracle. However, the oracles tend to be very vague and riddle-like in their answers.

The Phoenix A race are all comprised of females. And while there are always rumours of half-breeds with a Phoenix or a temple of males...there has never been any evidence to this and most consider it the ramblings of wishful idiots. Since the Phoenix race is a cycle of death and rebirth, it is also common knowledge that they can end their lives whenever they choose...which makes capture or interrogation completely impossible.`
      },
      {
        title: 'History',
        content: `Whenever a major event has happened in Furrae, odds are there was a Phoenix A trying to tell someone in advance and getting ignored. For themselves, the Phoenix A race doesn't have much of a history. As long as anyone can remember, the Phoenix A race has been tending to their temples and gathering knowledge. In that regard, they are rather unspectacular.`
      },
      {
        title: 'Strengths',
        content: `The Phoenix A race is incredibly smart. They also seem magically adept, however they never seem to use their abilities outside of basic functions like temple cleaning or repairing.`
      },
      {
        title: 'Weaknesses',
        content: `The Phoenix A race doesn't really have any known weaknesses. They can be killed by any simple means. However, when they die, they are simply reborn in another place.`
      },
      {
        title: 'Notable Figure: Pandora',
        content: `Age unknown, Pandora's real name is unknown...however most have given her the nickname Pandora. While other Phoenix die and are reborn usually younger and with a slightly different outlook and personality...Pandora is reborn with the exact same form and the exact same purpose. As mentioned, the Phoenix A race are complete pacifists who will refrain from fighting by any means. However, if someone truly wrongs a Phoenix A...they will soon be visited by Pandora.

Pandora is said to have the knowledge of the exact time and means that one will die. And that if she tells you this information, it will not only drive you insane...but also create an unbreakable prophecy. So much that anyone who is entrapped in it will have no choice but to fulfill their destiny and die at that particular time and method regardless of desire or choice.`
      }
    ]
  },
  {
    name: 'Phoenix (B)',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_PhoenixB.gif',
    attributes: [
      { label: 'Wings', value: 'Feathered Wings' },
      { label: 'Type', value: 'Avian' },
      { label: 'Forms', value: 'Usually has second-form' },
      { label: 'Magic', value: 'Nature-oriented magic' },
      { label: 'Diet', value: 'Vegetarian' },
      { label: 'Lifespan', value: '95 years' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `A more common variant from the fiery-haired phoenix, the term is often applied to the general avian race. This is most likely because the general avian race is so intermingled that it is hard to tell a magically endowed one from a non by most standard terms. However it is known that many phoenix B categories have a natural affinity for elements in nature and an ability to transform from an avian to a regular being. This ability likely also adds confusion about the race so no one is really sure how many exist as far as a race goes.\n\nDespite their abilities for magic, most phoenix B groups are considered in the class of beings. This is also in part that they were the only race to reject membership of the Creature Council. A peaceful race, they will often find themselves on the opposing end of many a Creature's plan. It is also likely they are the closest magical allies beings have.`
      },
      {
        title: 'History',
        content: `The history of the Phoenix B is often muddled since for a good period of time they never bothered to actually write down any recordings. Instead many of them chose to mingle among beings since their life span was similar, some never even telling their closest loved ones of their true heritage. Despite their close ties to the phoenix A groups, they seem to have very strained relationships with a lot of the other Creatures who see them as a major nuisance unknowing of what is best for them.`
      },
      {
        title: 'Strengths',
        content: `Nature-based magic spells will often assist and most Phoenix B groups have a special tie towards non-sentient species. They also have an ability to polymorph themselves into a normal being species (usually a feline) so can often act as valuable spies.`
      },
      {
        title: 'Weaknesses',
        content: `Changing from one form to another is very tiring and leaves many a Phoenix B weak. They also live rather short lives in comparison to other Creatures and can be killed by normal means.`
      },
      {
        title: 'Notable Figure: Baneel',
        content: `Age unknown, Baneel was a powerful mage who thought of nothing more than to bring about peace to the world between races. Living amongst the phoenix oracles, she quickly rose in esteem and knowledge. Seeking many of the ancient texts that even some of the high powered oracles couldn't translate, it wasn't uncommon for her to be seen pacing hallways as she pondered and read. However as time grew on, she became more and more reclusive and began to shun even the closest of friends... instead locking herself away in her chambers for days on end.\n\nFinally, after a few weeks of not seeing her, the phoenix oracles pried open the door to her chambers only to discover no sign of her and the room in total shambles. All along the walls were strange runic symbols and what appeared to have been a highly elaborate spell unlike any other seen by the oracles. Baneel is credited to the creation of many spells, including spells that beings would be capable of despite no natural magic abilities.`
      }
    ]
  },
  {
    name: 'Gryphon (A)',
    type: 'race',
    attributes: [
      { label: 'Posture', value: 'Bipedal' },
      { label: 'Intelligence', value: 'Sentient' },
      { label: 'Magic', value: 'Prodigal magical capabilities' },
      { label: 'Population', value: 'Majority of Gryphon species' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `Gryphon A are the bipedal, sentient majority of the Gryphon species, blessed with prodigal magical capabilities. It should be noted that the A, B, and C classifications don't actually imply anything in actual Furrae as they are all called Gryphon, it is just for this Demonology mentioning to help people tell them apart.`
      },
      {
        title: 'History',
        content: `The three Gryphon races have always lived together as far as their records go, and as such it seems their historical note is almost interlocked. For the most part Gryphons don't play any major roles in historic events since the two-legged prefer to stick to their territories and document, the large ones to theirs and tend to terrorize, and the small four-legged ones tend to simply work alongside other creatures and beings for whatever reason they choose so.`
      }
    ],
  },
  {
    name: 'Gryphon (B)',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_GryphonB.gif',
    attributes: [
      { label: 'Eyes', value: 'Bright Eyes' },
      { label: 'Features', value: 'Beak and birdlike claws' },
      { label: 'Body', value: 'Mix of feathers/fur body' },
      { label: 'Size', value: 'Generally small size' },
      { label: 'Lifespan', value: '65 years' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `The Gryphon B race is generally a smaller yet much more intelligent version of Gryphon C (the really big ones). It should be noted that the A, B, and C classifications don't actually imply anything in actual Furrae as they are all called Gryphon, it is just for this Demonology mentioning to help people tell them apart.\n\nMost Gryphon B races are quick and witty, but lack the magical prowess of their two-legged counterparts. However since they do have such close ties to their magical relatives, they tend to get on good standing with the Creature races despite not being a member of the Creature society. Many Gryphon B love shiny coins and objects and have no regrets about working for them so it isn't uncommon for them to be found in the workforce.`
      },
      {
        title: 'History',
        content: `The three Gryphon races have always lived together as far as their records go, and as such it seems their historical note is almost interlocked. For the most part Gryphons don't play any major roles in historic events since the two-legged prefer to stick to their territories and document, the large ones to theirs and tend to terrorize, and the small four-legged ones tend to simply work alongside other creatures and beings for whatever reason they choose so.`
      },
      {
        title: 'Strengths',
        content: `Gryphon B races are fast, and can easily carry some of the heavier loads. Quick thinking, and with the ability to see in pitch black darkness, they are ideal to work with in many situations.`
      },
      {
        title: 'Weaknesses',
        content: `Most Gryphon B races can be killed via normal means. They don't tend to have a lot of magical power to them, though some have taught themselves skills. They are also known for holding deep grudges.`
      },
      {
        title: 'Notable Figure: Gringrrl',
        content: `Age 26, Gringrrl isn't that remarkable as far as general history goes, but to the Gryphon B races he is a legend. Having been given a special task of delivering a sacred tablet to some phoenix oracles, he single-handedly managed to outwit not only a series of bandits and demonic thieves, but even outwit a member of the Dragon Race (though no Dragon will admit to that). Having been successful, the phoenix oracles of the temple were so delighted by his abilities they built him a grand hall high atop their temple which is only accessible to flying creatures.`
      }
    ]
  },
  {
    name: 'Gryphon (C)',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_GryphonC.gif',
    attributes: [
      { label: 'Eyes', value: 'Bright Eyes' },
      { label: 'Features', value: 'Beak and birdlike claws' },
      { label: 'Body', value: 'Mix of feathers/fur body' },
      { label: 'Size', value: 'HUGE size' },
      { label: 'Lifespan', value: '200 years' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `The Gryphon C race consists of the larger, but much less intelligent version of the Gryphon B race. It should be noted that the A, B, and C classifications don't actually imply anything in actual Furrae as they are all called Gryphon, it is just for this Demonology mentioning to help people tell them apart.\n\nUnlike the other two factions of the Gryphon race, Gryphon C seem to show no real signs of sentience. However, due to their enormous size and ferocity, as well as their connection to the other members of their race...most creatures tend to avoid tangling with them. It doesn't help that most Gryphon C types seem to have a subtle resistance to magic, making any fight with them more difficult.\n\nFortunately, this particular type of Gryphon is rather uncommon and the race seems to be solitary outside of nesting season.`
      },
      {
        title: 'History',
        content: `The three Gryphon races have always lived together as far as their records go, and as such it seems their historical note is almost interlocked. For the most part Gryphons don't play any major roles in historic events since the two-legged prefer to stick to their territories and document, the large ones to theirs and tend to terrorize, and the small four-legged ones tend to simply work alongside other creatures and beings for whatever reason they choose so.`
      },
      {
        title: 'Strengths',
        content: `Gryphon C races are incredibly tough, and their large size lets them take on a lot of things. It has been documented a few times of Gryphon C types tangling with a dragon and giving the dragon a run for its money. They also show a bit of magic resistance as many spells have a hard time penetrating them.`
      },
      {
        title: 'Weaknesses',
        content: `Dumb. As. A. Doornail. One of the reasons the Gryphon C race isn't considered as big a threat as they could be is that they are incredibly stupid and easy to fool. On the flipside, it also makes controlling them near impossible as they tend to have the attention span of a gnat.`
      },
      {
        title: 'Notable Figure: Makka',
        content: `Age 15, Makka is only notable in that a few years back there was a nature documentary called "Flight of the Gryphons" that followed Makka's life. It gave a bit of insight into the life and activities of the larger Gryphons, and also some much useful information in how to prevent Gryphon C attacks. It is also the first time a non-gryphon was able to get moderately close to a Gryphon without them trying to eat him...though most beings considered the guy incredibly foolish.`
      }
    ]
  },
  {
    name: 'Being',
    type: 'race',
    image: 'https://missmab.com/Demo/Images/D_Being.gif',
    attributes: [
      { label: 'Species', value: 'Multiple species' },
      { label: 'Magic', value: 'Very weak or no magic' },
      { label: 'Diet', value: 'Omnivore' },
      { label: 'Lifespan', value: '75-100 years' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `The most common race in Furrae, Beings come in all shapes and sizes. A Being is generally defined as a non-magical race though there are exceptions to that rule thanks to many advances in magical learning. Nearly all Beings are omnivores as species really only plays an aesthetic role (As such, a rabbit-based being is fully capable of eating a ham sandwich and a wolf-based being can easily eat a salad).\n\nSince magic is for the most part unavailable to many beings, most rely on magical devices or the more recent rise of technology. It is likely that their so-called dependence on 'tools' is one of the reasons a few creature races consider beings to be inferior. Skirmishes between a powerful creature and a large group of Beings aren't an uncommon occurrence not to mention the rise of the adventuring profession, groups of beings dedicated to defending their own from the more powerful creatures.`
      },
      {
        title: 'History',
        content: `Off all the races, the Beings history runs the most similar to that of our own: starting with a stone age, then iron, then steel, an industrial revolution, etc etc...though there are minor differences in all of it. In some areas of Being history, it is still in an ancient age of swords while a hundred miles away might be a place similar to a downtown suburbia...most often the type of cities built by Beings reflect the Creature influences that exist also. Most recently there has been a formation of a Creature-Being council though its effectiveness is in question.`
      },
      {
        title: 'Strengths',
        content: `Beings are crafty and often quick to adapt where many a creature has tradition as its downfall. The recent technology and the ability to use it has also been an increasing bonus for many Beings. And of course, sheer numbers and the sense of solidarity.`
      },
      {
        title: 'Weaknesses',
        content: `Beings are not the strongest, or very powerful when compared to their magical and often enhanced Creature counterparts. As such, they can be killed by many easy means.`
      },
      {
        title: 'Notable Figure: Delna',
        content: `Age 41, Delna was in her youth one of the top adventuring-students of her time. Highly skilled, she quickly scored to the top of the Adventuring ranks and seemed full poised to take on the world and single-handedly defeat any Creature she chose. However, upon graduation she took to a profession as psychiatrist and counselor for both Creatures and Beings alike.\n\nYears later though the true merit of her actions proved beneficial as Delna's knowledge as an adventurer combined with her social skills proved handy in offering sound advice for many a Creature. It is very likely that Delna has convinced the same amount of Creatures to give up their negative ways and become no longer a threat as effectively as had she simply tried to slay them. Because of this she is likely one of the five most respected Beings alive.`
      }
    ]
  },
  { name: 'Human', type: 'race', attributes: [{ label: 'Classification', value: 'Mortal' }], sections: placeholderSection },
  
  // Classes
  {
    name: 'Mows',
    type: 'class',
    image: 'https://missmab.com/Demo/Images/D_Mow.gif',
    attributes: [
      { label: 'Wings', value: 'Little orange wings' },
      { label: 'Antennae', value: 'Green Glowing antennae' },
      { label: 'Immunities', value: 'Complete magic/physical/mental immunity' },
      { label: 'Lifespan', value: 'Unknown' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `They're cute, they're cuddly, and in some cases, they are highly feared little fluff-balls. Many a being or creature has tried to make a mow a pet only to find it eating them out of house and home... literally. Mows seem to digest only non-living materials such as furniture and clothing. The only exception to this rule is the Undead race... who while non-living, seem safe from turning into a mow-munchie.\n\nThere is no known number of how many mows exist currently. Some estimate a few hundred, while others estimate a few thousand. Studies have shown no real gender to them so it is assumed that the mows are unable to breed and thus were a created species. Mows tend to travel in large packs with no particular destination in mind. With an average IQ of about 3, the most thinking a mow does is seeing something and deciding if it should eat it or "hug" it.`
      },
      {
        title: 'History',
        content: `One of the reasons not much is known about mows is that they only very recently appeared in Furrae. It is suspected that they were a created species but as of such, no one has stepped forward to take responsibility...which is probably a wise thing since there are strict rules regarding life-creating. While not really making it into the history books, they have recently become a popular subject in children's books as well as stuffed mow-dolls have been a growing trend among the younger generations.`
      },
      {
        title: 'Strengths',
        content: `Perhaps the most baffling thing about mows is their apparent indestructible nature. Immune to magic spells, immune to physical attacks (in one demonstration a creature tried to crush one under a press only to have it bounce back to normal once the pressure was released), and too mentally inept to be phased by a mental attack, it seems mows are quite unstoppable.`
      },
      {
        title: 'Weaknesses',
        content: `While indestructible, a mow is basically unable to do any damage itself...unless one counts the retail damage of a mow eating an expensive handbag. The worst they can do is their hug, and even that is unlikely to cause any harm.`
      }
    ]
  },
  {
    name: 'Livestock',
    type: 'class',
    image: 'https://missmab.com/Demo/Images/D_Livestock.gif',
    attributes: [
      { label: 'Sentience', value: 'Non-sentient animals' },
      { label: 'Purpose', value: 'Food and resources' },
      { label: 'Diet', value: 'Varies by species' },
      { label: 'Status', value: 'Domesticated' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `It should be noted that in the world of Furrae (and in DMFA in general), almost all the races are omnivorous save for a few rogue cases. As such, even what would normally be considered vegetarian species (horses, deer, mice) are capable of eating meat products. However the standards of what KIND of meat are issues still left in debates.\n\nAlong with the general population of Furrae (creatures, beings) there are numerous amounts of non-sentient animals that are mostly the equivalent of how we see dogs, cats, chickens, cows...etc etc etc. There are a few species of animals that are raised basically as livestock and food. Some are unique to Furrae, others are basically things similar to our world.`
      },
      {
        title: 'Cultural Taboos',
        content: `While most races can eat meat, there IS however a set of taboos regarding which type of animals are eaten. A canine-based race would not eat a non-sentient canine and a cow-based race would not eat non-sentient cows as it is looked upon almost similar to how many cultures would look upon a person eating a chimpanzee. The rigidness of this taboo tends to flex depending on locations.`
      },
      {
        title: 'Creature/Being Issues',
        content: `The issue over what makes something dinner and what makes up a case for legal protection is an iffy case in the world of Furrae. Many arguments are often fought over a magical Creatures claiming a non-magical Being is fair game to be stalked and killed. In the world-view of the beings, any race that is able to show sentience and an ability to declare it is considered a sentient "being", where as a Creatures world-view is that survival should go to those who show the ability and proper desire to want to live.`
      }
    ]
  },
  {
    name: 'Pygmy Shrews',
    type: 'class',
    image: 'https://missmab.com/Demo/Images/D_Pygmy.gif',
    attributes: [
      { label: 'Key Features', value: 'Beady eyes, grass skirts, sharp pointy teeth' },
      { label: 'Lifestyle', value: 'Savage and ruthless, tribal society' },
      { label: 'Magic', value: 'Abandoned magic altogether' },
      { label: 'Lifespan', value: 'Unknown' },
    ],
    sections: [
      {
        title: 'General',
        content: `An odd but fierce little species of creatures, Pygmy Shrews have been the bane of many foolish adventurers who have accidentally wandered into them. While small, and not very strong, the sheer speed and numbers of these little guys can bring many to their knees.

Savage and ruthless, they have more or less adapted a strategy where survival is for the fittest and have abandoned civilization and magic altogether, which has oddly been a good strategy for them as many dungeons and places have little pseudo-villages of Pygmy Shrews. Since they are so odd, they seem to sometimes appear in the most random places out of the blue. Usually they will follow a leader or shaman, though they will always move in packs.

Pygmy shrews by default seem to hate outsiders, and only a few outsiders have ever been able to make friends with a tribe of Pygmy Shrews. According to the researcher who managed to befriend a tribe, in order to be accepted into the tribe one must either complete a challenge of unsurmountable pain, or defeat the tribe leader in a grass skirt hula challenge. No one has ever been able to defeat a tribe leader.`
      },
      {
        title: 'History',
        content: `History never speaks much of these guys, unless in random passages or famous last words of "These guys don't look so bad..."`
      },
      {
        title: 'Strengths',
        content: `Speed and sheer numbers are their advantage. Not to mention a few lace their spears with whatever they are in the mood for... poison... sleeping potion... aphrodisiacs...`
      },
      {
        title: 'Weaknesses',
        content: `They aren't really all that damaging on their own and probably would be easy to crush if they weren't so blasted annoying to target.`
      }
    ],
  },
  {
    name: 'Warp-Aci',
    type: 'class',
    image: 'https://missmab.com/Demo/Images/D_Aci.gif',
    attributes: [
      { label: 'Marking', value: 'Clan symbol on forehead' },
      { label: 'Tail', value: 'Long paper-thin tail' },
      { label: 'Aura', value: 'Glowing aura' },
      { label: 'Mouth', value: 'No mouth' },
      { label: 'Lifespan', value: 'Varies' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `The Warp-Aci gets the name from its ability to teleport objects or living beings from one location to another. Using their paperlike tails, they are able to cut through a dimensional fabric of sorts which allows anyone within the circle to transport to wherever the Warp-Aci was commanded to go to. By average, most Warp-Aci are cute small creatures as they are a favorite familiar to girls. However since they are composed primarily of Dark shadow magic, they can actually alter their look to suit their master's desire.\n\nSummoning forth a Warp-Aci is tricky work where the summoner must send out a beacon through a portal of dark mist into the magical realm they exist in. If the summoner is skilled or lucky enough, a curious Aci will respond and attempt to enter the dimension. Passing through the mist gives them their dark form which continues to radiate the ethereal energy that actually contains their true nature.`
      },
      {
        title: 'Bonding',
        content: `A Warp-Aci will almost always have the marking of its owner on their forehead. This symbol is what ties them to their owner. While most Warp-Aci automatically return to their realm upon their owner's death, some will simply become free-ranging Aci. This freedom is both exciting and terrifying and many Warp-Aci cannot handle the stress of not having an owner.`
      },
      {
        title: 'Strengths',
        content: `Warp-Aci are fast, and can teleport easily. They aren't really designed for battle so much and are only really as powerful as the spell that summoned it. Most summoners are bright enough to know not to summon something with enough power to cause them trouble... most...`
      },
      {
        title: 'Weaknesses',
        content: `While in this dimension, Warp-Aci are vulnerable to most normal attacks. It isn't sure what happens after one dies, but it is suspected that its ethereal form becomes trapped in the dimension until its owner dies then it is allowed to return to its home.`
      }
    ]
  },
  { name: 'Twinks', type: 'class', attributes: [{ label: 'Classification', value: 'Class' }], sections: placeholderSection },
  { name: 'Amazons', type: 'class', attributes: [{ label: 'Classification', value: 'Class' }], sections: placeholderSection },
  {
    name: 'Arachspearians',
    type: 'class',
    attributes: [
      { label: 'Species Type', value: 'Arachnids' },
      { label: 'Intelligence', value: 'Non-sentient (bright as a goldfish)' },
      { label: 'Language', value: 'Sounds like Shakespeare works' },
      { label: 'Coloring', value: 'Different colors reflect different works' },
      { label: 'Special Ability', value: 'Random bite effects' },
    ],
    sections: [
      {
        title: 'General Overview',
        content: `Arachspearians are arachnids that, despite their use of words, aren't sentient. For some reason, their language sounds exactly like various Shakespeare works. Maybe it was due to some magic tinkering, maybe it's just coincidence, who's to say. However, they are still only about as bright as a goldfish.

The different colors seem to reflect which type of work they tend to recite. And in actuality they can only recite a certain amount of lines at most. So sometimes one ends up with one who quotes a really obscure verse.`
      },
      {
        title: 'Abilities',
        content: `The only other unique thing about them is that their bites cause completely random reactions. Sometimes it does nothing, sometimes it causes illness, sometimes it causes one to learn ice-magic or for their nose to turn magenta. Some like to play a game similar to Russian roulette with a pet Arachspearian. Not recommended though.`
      }
    ],
  },
  { name: 'Drakes', type: 'class', attributes: [{ label: 'Classification', value: 'Class' }], sections: placeholderSection },
];