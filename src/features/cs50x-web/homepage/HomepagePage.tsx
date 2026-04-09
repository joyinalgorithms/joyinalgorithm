import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import Textarea from '@mui/joy/Textarea';
import Grid from '@mui/joy/Grid';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import AspectRatio from '@mui/joy/AspectRatio';

// Tab 1: Home component
const HomeTab = () => (
  <Box>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 6 }}>
      <Box sx={{ flex: 1 }}>
        <Typography level="h2" sx={{ mb: 2 }}>Joy Bernal</Typography>
        <Typography mb={2}>
          My name is Christine Joy Bernal. I am from the Philippines. I speak Tagalog, English, and Chinese. I am currently a Computer Science student at President Ramon Magsaysay State University (PRMSU). I strive to be excellent in what I do. I set a high standard for myself, and don't settle for less than that.
        </Typography>
        <Typography mb={2}>
          My childhood dream never includes the path I am taking right now. I did not dream of being passionate about programming, and yet, in reality, I did. Before the pandemic, I planned to become a stewardess. It has been my dream since I remember. I want to travel the world, get out of my comfort zone, and explore the world.
        </Typography>
        <Typography mb={2}>
          Seems like life has other plans for me, better than what I have planned for myself. Because now, I love what I do and I do what I love. I found something that I can be really passionate about. I cannot imagine my life without programming right now.
        </Typography>
        <Typography>
          In the journey of finding your purpose and passion while carrying the weight of your obligations and responsibilities, time was my greatest enemy. The time seems to be not enough. Time is so fast I can't keep up. I feel like running out of time every time.
        </Typography>
      </Box>
      <Box sx={{ flexShrink: 0, width: { xs: '100%', md: '300px' } }}>
        {/* Placeholder image for original self-portrait */}
        <AspectRatio ratio="1" objectFit="cover" sx={{ borderRadius: 'md' }}>
          <img
            src="/images/profile.jpg"
            alt="Profile"
            style={{ objectFit: 'cover' }}
          />
        </AspectRatio>
      </Box>
    </Box>

    <Divider sx={{ mb: 4 }} />

    <Grid container spacing={2} sx={{ mb: 6 }}>
      <Grid xs={12} md={4}>
        <Card variant="soft" color="primary" sx={{ height: '100%' }}>
          <Typography fontWeight={600}>"Don't Wait for Opportunity, Create it."</Typography>
          <Typography level="body-sm">- George Bernard Shaw</Typography>
        </Card>
      </Grid>
      <Grid xs={12} md={4}>
        <Card variant="soft" color="warning" sx={{ height: '100%' }}>
          <Typography fontWeight={600}>"Don't be like the rest of them. Be you."</Typography>
          <Typography level="body-sm">- Anonymous</Typography>
        </Card>
      </Grid>
      <Grid xs={12} md={4}>
        <Card variant="soft" color="success" sx={{ height: '100%' }}>
          <Typography fontWeight={600}>"Programming isn't about what you know; it's about what you can figure out.”</Typography>
          <Typography level="body-sm">- Chris Pine</Typography>
        </Card>
      </Grid>
    </Grid>

    <Typography level="h3" sx={{ textAlign: 'center', mb: 3 }}>Word Collection</Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
      {['Believe', 'Persevere', 'Thrive', 'Overcome', 'Empower', 'Dream', 'Achieve', 'Inspire', 'Transform', 'Unstoppable', 'Endure', 'Focus'].map(word => (
        <Card key={word} variant="outlined" sx={{ py: 1, px: 3, borderRadius: 'xl', bgcolor: 'background.surface' }}>
          <Typography fontWeight={700} color="primary">{word}</Typography>
        </Card>
      ))}
    </Box>
  </Box>
);

// Tab 2: Me component
const MeTab = () => (
  <Box>
    <Grid container spacing={4} sx={{ mb: 6 }}>
      <Grid xs={12} md={5}>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardContent>
            <Typography level="h3" sx={{ mb: 2 }}>Favorites</Typography>
            <Stack spacing={1} divider={<Divider />}>
              <Typography><strong>Color:</strong> Grey & Beige</Typography>
              <Typography><strong>Food:</strong> Everything sour</Typography>
              <Typography><strong>Drink:</strong> Nestea</Typography>
              <Typography><strong>Group:</strong> Seventeen, Gfriend</Typography>
              <Typography><strong>Song:</strong> There's too many!</Typography>
              <Typography><strong>Singer:</strong> Jessica Baio, Conor Maynard</Typography>
              <Typography><strong>Genre:</strong> Acoustic Ballad</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={7}>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardContent>
            <Typography level="h3" sx={{ mb: 2 }}>Hobbies</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {['Code', 'Reading books', 'Listening to audiobooks', 'Studying', 'Playing guitar', 'Workout', 'Watch chinese shows', 'Writing stuffs', 'Listen to music', 'Photography'].map(hobby => (
                <Card key={hobby} variant="soft" color="neutral" sx={{ py: 0.5, px: 1.5 }}>
                  <Typography level="body-sm" fontWeight="md">{hobby}</Typography>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
      <Box sx={{ flexShrink: 0, width: { xs: '100%', md: '300px' } }}>
        {/* Placeholder image for original self-portrait 2 */}
        <AspectRatio ratio="3/4" objectFit="cover" sx={{ borderRadius: 'md' }}>
          <img
            src="/images/profile2.jpg"
            alt="Profile"
            style={{ objectFit: 'cover' }}
          />
        </AspectRatio>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography level="h3" sx={{ mb: 2 }}>Me, Myself & I</Typography>
        <Typography mb={2}>
          When I was a little girl, I was very insecure about how I looked and everything I did. I feel like I am not enough. I always feel like some people are just way better than I am. I have this mindset that I am just average. I can't do anything out of the ordinary. Just a kid, just another girl.
        </Typography>
        <Typography mb={2}>
          I never really excelled at school. But I am not on the lowest side either. Just in the middle. Just the average. Everything I do feels mediocre. Just an average high schooler would do.  I am too afraid to try something new because I am scared of failure. I don't trust myself to fail. I was always sure that I couldn't do it.
        </Typography>
        <Typography mb={2}>
          It all changed in college. I realized that I could choose not to be average. I only have to trust myself and work hard every step of the way. And realize that it's okay to fail and to fall. Because there's always a chance to stand up and prove yourself. I change my old mindset to a growth mindset.
        </Typography>
        <Typography mb={2}>
          I started trusting myself more. I joined a school organization and became an active student. I maintain high grades and always strive for more. I always try to do more than my peers do. I want to be someone who is good at being a student leader and an excellent student as well. And I think I am slowly achieving that goal.
        </Typography>
        <Typography>
          I still doubt my skills sometimes, but that doesn't stop me from trying. It only fuels my desire to be better. To be the better version of myself than yesterday. I do feel insecure about my looks, but I try to love myself more. I am slowly learning to embrace what I naturally have. Trust me to be myself. No more hiding in the dark.
        </Typography>
      </Box>
    </Box>
  </Box>
);

// Tab 3: Coding Journey component
const JourneyTab = () => (
  <Box>
    <Stack spacing={4}>
      <Card variant="outlined">
        <CardContent>
          <Typography level="h4" color="primary" sx={{ mb: 1 }}>Discovery</Typography>
          <Typography>
            I first discovered programming way back in 2022. It all started when I was trying to find what path should I take in college. Then this computer science course popped up. And the salary was so great. The salary was so fascinating for me that I started to research more about this job. I watch various videos of advice and reality in the field to get myself more familiar with it.
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography level="h4" color="warning" sx={{ mb: 1 }}>First Six Months</Typography>
          <Typography>
            In the first six months of my coding journey, I don't have the motivation to study it. I feel like I don't understand anything. The doubt came again that maybe I really couldn't do that. But then, I am not someone who backs down just because I find something difficult to do. I learned my lesson a long time ago. So I persevered, took various online courses, and put my mind into programming. I began to understand the concepts. The first language that I learned was C++. I remember then that I was excited about building a calculator at that time. I felt proud of myself. I still remember the frustration when I encountered my first error. That was because I forgot the semicolon. Then from there, I built up my knowledge and discovered CS50 as well. And it completely changed my life.
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography level="h4" color="success" sx={{ mb: 1 }}>First Year</Typography>
          <Typography>
            I continue learning for a year. I learned Java because that was the language we used at school. Simultaneously, I am learning C as well in CS50. I continue learning all the basics and sometimes it feels like it was not enough. I feel like I am not going anywhere because all I learned was the basics. It was far from what I expected when I built apps and websites that looked really nice. It was frustrating back then. CS50 was my favorite course because it opened my mind to the possibilities of programming. It makes me think outside the box and really force my creativity to come into life. However, sometimes, it is really frustrating because the problem set is so difficult. But I continued learning nonetheless and completed them. And I felt proud of myself every time I complete a week.
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography level="h4" color="danger" sx={{ mb: 1 }}>Present</Typography>
          <Typography>
            I think I have come so far when it comes to programming, but at the same time feels like I still have a long way to go. I have learned and become familiar with many languages including C++, C, Java, VB.NET, Javascript, Python, and SQL. Also, I learned HTML and CSS. I am familiar with the syntax and how they work but I still want to dig deeper and learn more. I plan to practice more HTML, CSS, and Javascript so that I can be a front-end developer. That was the plan for now. Then I will explore the back end after I master the front end.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  </Box>
);

// Tab 4: Gallery component
const GalleryTab = () => (
  <Box>
    <Typography level="h3" sx={{ textAlign: 'center', mb: 4 }}>
      Photo Gallery
    </Typography>

    <Grid container spacing={2}>
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <Grid xs={12} sm={6} md={4} key={num}>
          <Card variant="outlined" sx={{ p: 0, overflow: 'hidden' }}>
            <AspectRatio ratio="1">
              <img
                src={`/images/image${num}.jpg`}
                alt={`Gallery ${num}`}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </AspectRatio>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);
// Tab 5: Feedback component
const FeedbackTab = () => {
  interface Comment { text: string; date: string; }
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cs50_homepage_comments');
    if (saved) {
      try { setComments(JSON.parse(saved)); }
      catch { /* Ignore corrupted localstorage */ }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newComment: Comment = {
      text: input.trim(),
      date: new Date().toLocaleString()
    };
    const updated = [newComment, ...comments];

    setComments(updated);
    localStorage.setItem('cs50_homepage_comments', JSON.stringify(updated));
    setInput('');
  };

  return (
    <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
      <Typography level="h3" sx={{ mb: 2 }}>Leave a Comment</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ mb: 4 }}>
          <Textarea
            minRows={3}
            placeholder="Say hello!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit">Submit Feedback</Button>
        </Stack>
      </form>

      <Typography level="title-lg" sx={{ mb: 2 }}>Guestbook Feedback</Typography>
      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        {comments.length === 0 && (
          <Typography color="neutral" fontStyle="italic">No comments yet. Be the first!</Typography>
        )}
        {comments.map((c, i) => (
          <Card key={i} variant="outlined" size="sm">
            <CardContent>
              <Typography level="body-sm" color="neutral" sx={{ mb: 0.5 }}>{c.date}</Typography>
              <Typography>{c.text}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  )
};


export function HomepagePage() {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4, md: 6 },
        maxWidth: '1200px',
        mx: 'auto',
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography level="h1" sx={{ mb: 1, fontWeight: 800, letterSpacing: "-0.02em" }}>
          CS50x: Homepage
        </Typography>
        <Typography level="body-lg" sx={{ color: "text.secondary" }}>
          A React translation of the CS50 Homepage static HTML project.
        </Typography>
      </Box>

      <Card variant="outlined" sx={{ flexGrow: 1, bgcolor: "background.surface", boxShadow: "sm", borderRadius: "xl", p: { xs: 1, md: 2 } }}>
        <Tabs aria-label="Homepage Navigation" defaultValue={0} sx={{ bgcolor: 'transparent' }}>
          <TabList
            disableUnderline
            sx={{
              p: 0.5,
              gap: 0.5,
              borderRadius: 'xl',
              bgcolor: 'background.level1',
              mb: 3,
              overflowX: 'auto'
            }}
          >
            <Tab disableIndicator sx={{ borderRadius: 'lg' }}>Home</Tab>
            <Tab disableIndicator sx={{ borderRadius: 'lg' }}>Me</Tab>
            <Tab disableIndicator sx={{ borderRadius: 'lg' }}>Coding Journey</Tab>
            <Tab disableIndicator sx={{ borderRadius: 'lg' }}>Gallery</Tab>
            <Tab disableIndicator sx={{ borderRadius: 'lg' }}>Feedback</Tab>
          </TabList>

          <TabPanel value={0} sx={{ p: 2 }}><HomeTab /></TabPanel>
          <TabPanel value={1} sx={{ p: 2 }}><MeTab /></TabPanel>
          <TabPanel value={2} sx={{ p: 2 }}><JourneyTab /></TabPanel>
          <TabPanel value={3} sx={{ p: 2 }}><GalleryTab /></TabPanel>
          <TabPanel value={4} sx={{ p: 2 }}><FeedbackTab /></TabPanel>
        </Tabs>
      </Card>
    </Box>
  );
}
