/*
  ============================================================
   EMOTIONS WHEEL — THE WORDS, DEFINITIONS AND COLOURS
  ============================================================

  This is the only file you need to touch to change what the wheel says.

  How it's organised:
    • Each block below is one CORE emotion (the inner ring).
    • Inside it, "more" lists the MIDDLE ring emotions.
    • Inside each of those, "more" lists the OUTER ring emotions.

  You can:
    • Reword any "definition" — just keep the text inside the quotes.
    • Change a "color" — use a hex colour code like "#F4A35C"
      (pick one at https://htmlcolorcodes.com).
    • Add or remove emotions — copy an existing line and edit it.
      Remember the comma between items!

  After editing, refresh index.html in your browser to see the change.
  If the wheel goes blank, a comma or quote is probably missing —
  open check.html to find out where.
*/

var EMOTIONS = [
  {
    name: "Fearful",
    color: "#F4A35C",
    definition: "Sensing danger or uncertainty and wanting to protect yourself.",
    whatItMayMean: "Often points to a need for <b>safety</b>, reassurance or more information.",
    more: [
      { name: "Scared", definition: "Feeling a sudden sense of threat and wanting to get away or hide.", more: [
        { name: "Helpless", definition: "Feeling unable to change or escape a difficult situation." },
        { name: "Frightened", definition: "Feeling intense, immediate fear in response to something alarming." }
      ]},
      { name: "Anxious", definition: "Feeling uneasy about what might happen, with a mind that keeps scanning for problems.", more: [
        { name: "Concerned", definition: "Feeling troubled about something or someone and wanting it to turn out okay." },
        { name: "Worried", definition: "Feeling your thoughts loop around possible bad outcomes." }
      ]},
      { name: "Insecure", definition: "Doubting yourself and your place, unsure you are good enough.", more: [
        { name: "Inadequate", definition: "Feeling you don't have what it takes to meet what's asked of you." },
        { name: "Inferior", definition: "Feeling lesser than the people around you." }
      ]},
      { name: "Weak", definition: "Feeling drained of the strength or power to stand up for yourself.", more: [
        { name: "Worthless", definition: "Feeling you have no value or nothing to offer." },
        { name: "Insignificant", definition: "Feeling small, as if you don't really matter." }
      ]},
      { name: "Rejected", definition: "Feeling pushed away or not wanted by others.", more: [
        { name: "Excluded", definition: "Feeling deliberately left out of a group or activity." },
        { name: "Persecuted", definition: "Feeling singled out and unfairly targeted with hostility." }
      ]},
      { name: "Threatened", definition: "Feeling that your safety, status or wellbeing is at risk.", more: [
        { name: "Nervous", definition: "Feeling jittery and on edge, often before something important." },
        { name: "Exposed", definition: "Feeling unprotected and seen in a way you didn't choose." }
      ]}
    ]
  },
  {
    name: "Angry",
    color: "#EE6B6B",
    definition: "Feeling strong displeasure when something seems wrong, unfair or in your way.",
    whatItMayMean: "Often points to a crossed <b>boundary</b> or a sense that something is unfair.",
    more: [
      { name: "Let down", definition: "Feeling disappointed because someone didn't come through as you expected.", more: [
        { name: "Betrayed", definition: "Feeling hurt and angry after someone you trusted broke that trust." },
        { name: "Resentful", definition: "Holding on to bitterness about being treated unfairly." }
      ]},
      { name: "Humiliated", definition: "Feeling deeply embarrassed and lowered in front of others.", more: [
        { name: "Disrespected", definition: "Feeling your worth or boundaries were ignored or dismissed." },
        { name: "Ridiculed", definition: "Feeling mocked or made fun of." }
      ]},
      { name: "Bitter", definition: "Feeling lingering anger and disappointment that sours your outlook.", more: [
        { name: "Indignant", definition: "Feeling angry at something you see as unjust or offensive." },
        { name: "Violated", definition: "Feeling that a personal boundary or right was crossed without your consent." }
      ]},
      { name: "Mad", definition: "Feeling openly angry and heated.", more: [
        { name: "Furious", definition: "Feeling intense, almost overwhelming anger." },
        { name: "Jealous", definition: "Feeling threatened that someone may take what — or who — matters to you." }
      ]},
      { name: "Aggressive", definition: "Feeling ready to confront, push back or attack.", more: [
        { name: "Provoked", definition: "Feeling deliberately stirred up or goaded into reacting." },
        { name: "Hostile", definition: "Feeling unfriendly and antagonistic toward someone." }
      ]},
      { name: "Frustrated", definition: "Feeling blocked from reaching a goal or getting what you need.", more: [
        { name: "Infuriated", definition: "Feeling enraged by something that keeps going wrong." },
        { name: "Annoyed", definition: "Feeling mildly irritated by something bothersome." }
      ]},
      { name: "Distant", definition: "Feeling emotionally removed, keeping others at arm's length.", more: [
        { name: "Withdrawn", definition: "Pulling back from people and conversation to protect yourself." },
        { name: "Numb", definition: "Feeling little or nothing, as if your emotions have been switched off." }
      ]},
      { name: "Critical", definition: "Focusing on faults and on what isn't good enough.", more: [
        { name: "Sceptical", definition: "Doubting whether something is true or trustworthy." },
        { name: "Dismissive", definition: "Treating something as unworthy of attention or consideration." }
      ]}
    ]
  },
  {
    name: "Disgusted",
    color: "#9AA5BC",
    definition: "Feeling strong aversion toward something that seems offensive, wrong or unclean.",
    whatItMayMean: "Often signals that something clashes with your <b>values</b> or sense of what's okay.",
    more: [
      { name: "Disapproving", definition: "Feeling that something or someone falls short of your standards or values.", more: [
        { name: "Judgmental", definition: "Forming harsh opinions about other people's choices or character." },
        { name: "Condemned", definition: "Feeling judged and blamed by others, as if declared guilty." }
      ]},
      { name: "Uncomfortable", definition: "Feeling uneasy, as if something about the situation isn't right.", more: [
        { name: "Appalled", definition: "Feeling shocked and dismayed by something wrong or offensive." },
        { name: "Revolted", definition: "Feeling an urge to pull away from something deeply unpleasant." }
      ]},
      { name: "Awful", definition: "Feeling thoroughly bad, physically or emotionally.", more: [
        { name: "Nauseated", definition: "Feeling sick to your stomach in response to something." },
        { name: "Detestable", definition: "Feeling that something — or you yourself — is hateful or loathsome." }
      ]},
      { name: "Repelled", definition: "Feeling pushed away by something you find distasteful.", more: [
        { name: "Horrified", definition: "Feeling shock and disgust at something terrible." },
        { name: "Hesitant", definition: "Holding back because something feels off or uncertain." }
      ]}
    ]
  },
  {
    name: "Sad",
    color: "#6E97DE",
    definition: "Feeling low, heavy or sorrowful, often after a loss or disappointment.",
    whatItMayMean: "Often points to a <b>loss</b>, and a need for comfort, connection or time.",
    more: [
      { name: "Hurt", definition: "Feeling emotional pain caused by someone's words or actions.", more: [
        { name: "Embarrassed", definition: "Feeling self-conscious and awkward after something exposes you." },
        { name: "Disappointed", definition: "Feeling let down when things didn't turn out as you hoped." }
      ]},
      { name: "Depressed", definition: "Feeling persistently low, with little energy or interest in things.", more: [
        { name: "Unseen", definition: "Feeling that others don't notice or understand you." },
        { name: "Empty", definition: "Feeling hollow, as if something essential is missing." }
      ]},
      { name: "Guilty", definition: "Feeling you did something wrong and wanting to make it right.", more: [
        { name: "Remorseful", definition: "Feeling deep regret for harm you caused." },
        { name: "Ashamed", definition: "Feeling that something about you is wrong or bad, and wanting to hide." }
      ]},
      { name: "Despair", definition: "Feeling that hope is gone and things won't get better.", more: [
        { name: "Grief", definition: "Feeling deep sorrow after losing someone or something important." },
        { name: "Powerless", definition: "Feeling you have no influence over what happens." }
      ]},
      { name: "Vulnerable", definition: "Feeling open to hurt or harm, without your usual defences.", more: [
        { name: "Victimised", definition: "Feeling targeted and harmed by other people's actions." },
        { name: "Fragile", definition: "Feeling delicate, as if you could easily break." }
      ]},
      { name: "Lonely", definition: "Feeling disconnected and wishing for closeness with others.", more: [
        { name: "Isolated", definition: "Feeling cut off from people or support." },
        { name: "Abandoned", definition: "Feeling left behind by someone you relied on." }
      ]}
    ]
  },
  {
    name: "Happy",
    color: "#F7CC4F",
    definition: "Feeling good, light and glad about life or a moment in it.",
    whatItMayMean: "A signal that a need is being met — worth <b>savouring</b> and noticing what helps.",
    more: [
      { name: "Optimistic", definition: "Expecting good things and feeling confident about the future.", more: [
        { name: "Inspired", definition: "Feeling stirred to create, act or grow." },
        { name: "Hopeful", definition: "Feeling that what you want is possible." }
      ]},
      { name: "Trusting", definition: "Feeling safe relying on others.", more: [
        { name: "Intimate", definition: "Feeling close and deeply connected with someone." },
        { name: "Sensitive", definition: "Feeling attuned and open to your own and others' emotions." }
      ]},
      { name: "Peaceful", definition: "Feeling calm, settled and at ease.", more: [
        { name: "Thankful", definition: "Feeling grateful for what you have or have received." },
        { name: "Loving", definition: "Feeling warm affection and care for someone." }
      ]},
      { name: "Powerful", definition: "Feeling strong and capable of making things happen.", more: [
        { name: "Creative", definition: "Feeling full of ideas and the urge to make something new." },
        { name: "Courageous", definition: "Feeling brave enough to face fear or risk." }
      ]},
      { name: "Accepted", definition: "Feeling welcomed and included just as you are.", more: [
        { name: "Valued", definition: "Feeling that you and your contributions matter." },
        { name: "Respected", definition: "Feeling regarded with esteem and consideration." }
      ]},
      { name: "Proud", definition: "Feeling satisfied with an achievement or quality, yours or someone else's.", more: [
        { name: "Confident", definition: "Trusting your own abilities and judgment." },
        { name: "Successful", definition: "Feeling you've achieved what you set out to do." }
      ]},
      { name: "Interested", definition: "Feeling drawn in and wanting to know more.", more: [
        { name: "Inquisitive", definition: "Feeling eager to ask questions and explore." },
        { name: "Curious", definition: "Feeling a pull toward the new or unknown." }
      ]},
      { name: "Content", definition: "Feeling satisfied with things as they are.", more: [
        { name: "Joyful", definition: "Feeling bright, bubbling happiness." },
        { name: "Free", definition: "Feeling unrestricted and able to be yourself." }
      ]},
      { name: "Playful", definition: "Feeling light-hearted and in the mood for fun.", more: [
        { name: "Cheeky", definition: "Feeling mischievous in a good-natured way." },
        { name: "Aroused", definition: "Feeling stirred by desire or physical excitement." }
      ]}
    ]
  },
  {
    name: "Surprised",
    color: "#B88BDD",
    definition: "Reacting to something unexpected, whether pleasant or not.",
    whatItMayMean: "Signals something <b>unexpected</b>; a cue to pause and make sense of it.",
    more: [
      { name: "Excited", definition: "Feeling energised and enthusiastic about what's coming.", more: [
        { name: "Energetic", definition: "Feeling full of vitality and drive." },
        { name: "Eager", definition: "Feeling keen and impatient to begin." }
      ]},
      { name: "Amazed", definition: "Feeling astonished by something remarkable.", more: [
        { name: "Awe", definition: "Feeling wonder before something vast or extraordinary." },
        { name: "Astonished", definition: "Feeling greatly surprised, hardly able to believe it." }
      ]},
      { name: "Confused", definition: "Feeling unsure about what's happening or what to think.", more: [
        { name: "Perplexed", definition: "Feeling puzzled by something you can't make sense of." },
        { name: "Disillusioned", definition: "Feeling disappointed after discovering something isn't what you believed." }
      ]},
      { name: "Startled", definition: "Feeling a sudden jolt of surprise or alarm.", more: [
        { name: "Dismayed", definition: "Feeling distressed by an unwelcome surprise." },
        { name: "Shocked", definition: "Feeling stunned by something sudden and upsetting." }
      ]}
    ]
  },
  {
    name: "Bad",
    color: "#6CC7A5",
    definition: "Feeling generally off — low, drained or out of sorts — without one clear emotion.",
    whatItMayMean: "Often a sign you need <b>rest</b>, a break or a reset before anything else.",
    more: [
      { name: "Tired", definition: "Feeling worn out and in need of rest.", more: [
        { name: "Unfocused", definition: "Finding it hard to concentrate or keep your attention on one thing." },
        { name: "Sleepy", definition: "Feeling drowsy and longing for sleep." }
      ]},
      { name: "Stressed", definition: "Feeling strained by demands that seem bigger than your resources.", more: [
        { name: "Out of control", definition: "Feeling that events are moving faster than you can manage." },
        { name: "Overwhelmed", definition: "Feeling there is too much to handle at once." }
      ]},
      { name: "Busy", definition: "Feeling your time is completely taken up.", more: [
        { name: "Rushed", definition: "Feeling hurried, without enough time to do things properly." },
        { name: "Pressured", definition: "Feeling pushed by expectations or deadlines." }
      ]},
      { name: "Bored", definition: "Feeling restless and uninterested in what's around you.", more: [
        { name: "Apathetic", definition: "Feeling little motivation or care." },
        { name: "Indifferent", definition: "Feeling neither for nor against; it just doesn't seem to matter." }
      ]}
    ]
  }
];

// (Lets the automatic checks read this file. You can ignore this line.)
if (typeof module !== 'undefined') module.exports = EMOTIONS;
