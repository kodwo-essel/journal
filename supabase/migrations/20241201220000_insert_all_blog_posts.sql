/*
  # Insert All Blog Posts

  Insert all 3 blog posts from the JSON file
*/

-- Clear existing data first
DELETE FROM blog_posts;

-- Insert all blog posts
INSERT INTO blog_posts (
  title,
  excerpt,
  content,
  date,
  read_time,
  slug
) VALUES 
(
  'The Education System Reality Check',
  'Everyone is confused because the system that worked before is not working the same way anymore.',
  'Results are out. People are picking schools. People are picking programs. And I know most of you are thinking the same way your parents are thinking, the same way everyone is thinking. Which program will get me a job? Which one is safe? Which one will actually work?

I understand that feeling completely. But I want to talk about something that has been bothering me for a while now.

Our educational system is teaching us things that people were learning fifteen years ago. The world has moved on. Technology has moved on. Jobs have moved on. But our schools are still in the same place. You go through four years or three years studying something, you come out, and the thing you spent all that time learning about has either disappeared or it has changed so much that you do not even recognize it. Or there are so many people doing the same thing that there is simply no space for anyone else.

This is not just about universities. It is training colleges too. These places used to be like gold. You finish secondary school, you go to a training college, you come out, and there is a job waiting. That was real. That worked. But now? Now the government cannot absorb everyone. The private sector cannot absorb everyone. And everyone is confused because the system that worked before is not working the same way anymore.

So we keep pushing people into the same programs because that is what we know. That is what we have seen work. But we are not thinking about what will happen five years from now when this person finishes school. We are not thinking about whether that job will even exist. We are not thinking about whether the whole industry might have changed by then.

I had a conversation with someone I respect, and he told me something that made me think. He said people look at him strangely sometimes. Like his education was a waste. But this person has farms. He studied at university. He built a network. He learned how to think. And now he is using all of that in his business. But people do not see it that way. They think education is supposed to lead to one thing and one thing only. A job in an office somewhere. That is such a limited way of thinking.

The truth is that the gap between what we are learning and what the world actually needs has become very wide. Very wide. And while we wait for the system to fix itself, we cannot just sit and do nothing. We cannot afford to. We have to be smart about this.

So when you are picking a program, or when you are helping someone else pick one, think about it differently. Think about what will be relevant in five or ten years. Think about what skills matter. Think about what the world will actually need. Because the jobs you see right now might not be there when you graduate.

But here is the thing. You do not have to wait for a job to come to you. Whatever you study, you can do something with it. You studied chemistry? You can start a food processing business. You can preserve food. You can go into agriculture properly. You studied engineering? There are things that need to be built. There are businesses waiting to happen. You studied food science? Start a business with it. Whatever you are learning, there is a way to use it. You just have to see it.

I studied something that is very respected. And yes, It is a very good field to be. But I looked around at what was happening. I learned other things. I paid attention. And I moved into something else. One of my greatest assets is being willing to change. Being willing to learn. Being willing to look at the world and say okay, what actually makes sense right now?

So whether you are in school already or you are about to go, do not just accept what you are given. Learn beyond the classroom. Pay attention to what is changing. Pick up skills that matter. Do not wait for someone to create a job for you. Think about how you can create opportunities for yourself.

And look, I am not saying our schools are perfect. They need to do better. The system needs to catch up. But we cannot wait for that to happen. We can either sit and complain, or we can find our way around the problem. We can take charge of our own future.

So my advice is simple. Whether it is for your child or your younger sibling or your friend, think long term. Do not push them into something just because it sounds impressive or because it worked for someone else. Ask real questions. Look at what is coming. Help them understand what they are actually good at. Then match that with what you think the world will need.

That is how you make a decision that actually matters. That is how you prepare yourself properly. And that is the only advice worth giving.',
  '2025-12-01',
  '6 min read',
  'education-system-reality-check'
),
(
  'Don''t be like Kojo',
  'What kills a man is not always his crime, but his unbelief and pride.',
  'A king so hated crime that he made a decree.
Whoever commits a crime will pay a hefty fine.
A fine greater than a lifetime''s wages or be killed.

Time went by and people were dying because not only were they unable to stay away from crime, they were also unable to pay.
And because a king cannot go back on his words, they had to be killed.

The king began to feel pity for the people and asked his son.
"What can we now do?"

One day his son went to his father and said:
"Father, all your properties are my inheritance. By extension, all the land is mine too.
For the next N years, whoever commits a crime and runs to me, I will pay their fine."

The father agreed and said, "Accepted. But N will remain unknown even to you. I alone will know what N is."

And so it happened.

Kofi committed a crime and ran to the prince.
"Oh Prince, save me."

The prince went to his father''s inheritance, which was also his.
He took the money and paid his father on Kofi''s behalf.

Kofi''s fine was paid.
The money went back to the king.
And by extension, to the prince.

No one lost money.
The king did not go back on his word.
And Kofi was saved.

The prince then told Kofi:
"Go and tell the people in the town that whoever has committed a crime should come to me and they will be saved."

Kofi went to his friends, Kojo and Asantewaa.

Asantewaa ran to the prince.
But Kojo did not.

Kojo said:
"But I see you commit crimes sometimes too."

Yes, Kofi committed crimes sometimes.
But he quickly ran to the prince and was saved.

Kojo refused.
He believed he could live perfectly before the king.
He believed he would never commit a crime.

One day, the N years elapsed.

Kojo begged for mercy.
But it was already too late.

Kojo was killed.

What killed Kojo?

It was not his crimes.
It was his unbelief.
It was his pride.

He thought he could live perfectly before the king.
That arrogance and unbelief were what killed him.

Do not be like Kojo.

You will not go to hell because of your sins.
You will go because of your unbelief and pride.

Jesus is knocking at your door.',
  '2025-12-06',
  '4 min read',
  'do-not-be-like-kojo'
),
(
  'Help Your Friends Help You',
  'Your friends want to recommend you. But wanting to help and being able to help are two very different things.',
  'Your friends want to recommend you. They see what you can do. They know you''re talented. But wanting to help someone and actually being able to help them—those are two very different things.

This is the gap that costs you more opportunities than you realize.

Many of us have people around us who genuinely believe in what we do. They get it. And sometimes they even want to recommend us for work. But the moment they try to push you forward, something small gets in the way. Something that has nothing to do with whether you''re actually good.

Let me give you a simple example.

Your friend works somewhere that needs a photographer, or a designer, or a technician, or a caterer—something you can actually do. They''re excited. They immediately think of you. They want to mention your name in that meeting.

Then the team asks for your rate card. You don''t have one.

They ask for your business name. "Oh, I haven''t registered it yet."

They ask to see your previous work. You''re scrolling through your phone, trying to piece together something that looks halfway decent.

They ask for an invoice. You send something. It''s fine, but it doesn''t exactly scream professional.

And there it is. The person who wanted to fight for you starts to back away. Not because they don''t believe in you. But because it''s hard to convince other people when you don''t have the basics to show. It''s hard to stand up for someone when everything makes them look unprepared too.

A lot of opportunities don''t slip away because we''re not good enough. They slip away because we''re not ready in the ways that actually matter. People want to help. We just haven''t held up our end.

You don''t need to have everything figured out. You don''t need to pretend you''re bigger than you are. You just need to show up like you''re serious about this. That''s what your friends need from you.

A portfolio. An invoice that doesn''t look like it was typed on your phone. A business name. A way for people to actually reach you. Be reachable. Be organized.

Yeah, it costs something. Time. Money on a domain, registration, maybe a website. Hours on your own time figuring things out. It''s not glamorous and it''s not free.

But that''s the price of being somebody people want to recommend. Your friends will meet you halfway—but you have to actually show up first. When you do, they don''t have to hesitate anymore. They just say your name and it works.

Sometimes the door''s already open. You just have to walk through it ready.

Help your friends help you.',
  '2025-12-12',
  '3 min read',
  'help-your-friends-help-you'
);