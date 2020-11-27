---
title: Personal Data for Personal Growth
description: 
thumbnail: /media/electronics.jpg
date: 2020-11-10
type: note
tags:

---

# Personal Data for Personal Growth

<section>

![First blog](/media/electronics.jpg)
*Image creds to [Michael Dziedzic](https://unsplash.com/@lazycreekimages)*

The corporations with access to personal data can direct people's attention, even affect what actions taken, without the target being aware of it happening. Over time, this capability will grow stronger leaving us vulnarable to whoever have access to our personal data and sufficient computational power to predict our response for different triggers. This is one of the lessons I draw from Shoshana Zuboff's book on surveillance capitalism, and have seen in works of fiction such as Westworld. Most of us are used to give away our personal data in exchange of free services on the Internet, which could have some unintended consequences that we are not aware of.

<p><img src="/media/google-myactivity.gif"></p>

*A Google user scrolling through the MyActivity page.*

With the Chinese MiHome ecosystem of devices, or Google Home, or any other company trying to win this competition, the homes of the global upper-middle class are beginning to fill with these connected devices, aka. the Internet of Things (IoT). The hardware is becoming cheaper, smaller and less intrustive while we invite the Big Tech companies into more intimate spaces of our lives. When seen in this light, it's not a pretty picture of the future. All data about us, both online activity but increasingly offline activity, is simply powerful. But rather than someone else using our data as a means to their ends, what if we had access to all the data we generate from inteacting with various services and devices? How could that benefit us, even improve our lives?

## The Quantified Self

The closest thing to a culture or movement working to make all this personal data work for our own self-interest is the [Quantified Self](https://en.wikipedia.org/wiki/Quantified_self). It could be described as a community of people researching themselves with the help of quantified data and the devices that can capture it. By raising awareness about how your indicators respond over time, the people experiment with new actions and wait to see the result again. 

<p><img src="/media/QuantimetricSelfSensingPrototypeMann1996inset.jpg"></p>

*Steve Mann displaying an early prototype of "Quantimetric Self-Sensing" apparatus, 1996.*

However, the community is not without critique. As some have pointed out, and the slogan of "Self-Knowledge Through Numbers" make evident, it can be a very reductionist approach to self-understanding and growth. The Newtonian physics paradigm of measuring the one and only objective reality has been extending its reach across the world. 

## Cold and Warm Data
In the mission to help us see the limitations of this reductionist paradigm, Nora Bateson have, in contrast to Big Data, developed the [Warm Data](https://hackernoon.com/warm-data-9f0fcd2a828c?fbclid=IwAR08tZ-0G_Ckqc2RtbRrDellRtNAymRrh_WbC3o_ArddFGya7EnFnvRdYNk#_ftn1) approach. The goal is to help people percieve the interdependence, the transcontextual nature, of our lives. Rather than seeing ourselves as an individual in isolation, how do the context we are in shape and affect us? When people see the contexts we are a part of, and the interdependecies, they behave a lot differently. 

Moving into the Bateson train-of-thought, it is clear that we can never achieve true self-knowledge through numbers. While numbers can be helpful, it is just one of many tools in our journey of personal growth and development. I personally believe the core to personal growth is reflection, both done alone and with others. Reflecting by ourselves, we can begin to see objective data and our own subjective feeling towards our current situation, and rethink our prioritise and plans based on the available information. However, without reflecting in groups (whether in the work place, school or family), we can never expose the mental models of others and how we understand the world differently.

Based on these thoughts, I am currently in the process of experimenting with a weekly and monthly reflection practice using both quantive and qualitive, cold and warm data. The tricky part is to find a **balance** between a comprensive but not overwhelming mix of factors to include, but here are a few thoughts of things to include (if you any thoughts on this, would be keen to discuss that!):

- Health
  - Weekly average HRV (Heart-Rate Variability)
  - Hours spent on exercise
  - Weekly average sleep
  - Time spent meditating
- Time
  - Hours spent working
  - Hours spent with friends
  - Hours spent with partner
  - Hours spent on reading, learning and projects
- Mood
  - Happiness (1-10)
  - How much did I laugh this week (1-10)
- Achievement
  - Sense of achievement (1-10)
  - Percentage of weekly goals achieved
  - Chinese words learned

After gathering this information, a written reflection based on the weekly status can help to make sense of what happened. I might also write down a few questions to send to friends that I have interacted with. Following a written reflection, I will write a plan for next week as to balace what I feel is currently lacking, very much like a cybernetic system of feedback.

## The Open Source Community

While technology makes it easy to gather vast amounts of information, we might not want others to have access to all of this data. The Big Tech companies developing smart homes, wearables and other sensory equipment will only share the data with you if they too have access. However, there is increasingly attractive alternative: the open source community and the projects they develop.

<figure class="fullwidth">
    <p><img src="/media/homeassistant.png"></p>
</figure>

*A screenshot of Home Assistant, an open source alternative to commercial smart home platforms.*

I have been experimenting with running my personal data server on the OpenMediaVault (OMV) operating system (built on Debian). In OMV, I can run various services, such as NextCloud to run my personal cloud service with a calendar, contacts, e-mails and files. In addition, I am in the process of setting up Home Assistant combined with a time series database (such as InfluxDB) to gather sensory data, as well as other time-stamped data such as store calendar events, browsing history and phone activity. Having all these data streams/sources in the same format could provide future possibilities to visualize a time line, and even highlight repeated correlations between several data streams.

</section>