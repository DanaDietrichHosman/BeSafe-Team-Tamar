import styles from './About.module.css';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Noa Haba",
      role: "Full-Stack Developer",
      studies: "Dual-major B.Sc. Computer Science and MATAR Excellence Program & MBA",
      bio: "Student at the Hebrew University. I specialize in building reliable, user-centered systems. Having personally experienced social challenges in the past, it is incredibly important to me that no other child has to go through what I did. This project is my way of using technology to create a safer, kinder digital world."
    },
    {
      name: "Ester Mintzberg",
      role: "Full-Stack Developer",
      studies: "B.Sc. Computer Science Student",
      bio: "A driven and curious third-year Software Engineering student with a passion for problem-solving. I thrive in collaborative environments, bringing strong communication skills and a commitment to excellence to every challenge. Joining BeSafe allows me to channel my technical skills into a mission-driven project that prioritizes digital safety and social responsibility."
    },
    {
      name: "Dana Dietrich Hosman",
      role: "Full-Stack Developer",
      studies: "B.Sc. Computer Science Student with a minor in Bioinformatics",
      bio: "A second-year Computer Science student at Ben-Gurion University of the Negev and an active member of the BGRacing community. As a full-stack developer, I’m driven by building smart, efficient systems with real-world impact. Through projects focused on digital protection and anti-cyberbullying initiatives, I aim to use technology as a tool for awareness, safety, and positive online experiences."
    },
    {
      name: "Michal Zada",
      role: "Full-Stack Developer",
      studies: "B.Sc. Computer Science Student",
      bio: "A third-year Computer Science student and full-stack developer with a strong focus on building reliable, user-centric systems. I’m passionate about leveraging technology to combat cyberbullying and enhance digital safety. Through mission-driven projects, I combine technical depth, strong communication skills, and a sense of social responsibility to create systems that protect users and promote healthier online communities."
    }
  ];

  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>About BeSafe</h1>
      <p className={styles.description}>
        We are a team of developers from <b>QueenB</b> who created a smart solution 
        to protect children and teenagers on WhatsApp using AI technology.
      </p>

      <div className={styles.missionCard}>
        <h3 className={styles.cardTitle}>Our Mission</h3>
        <p>
          To provide parents with real-time insights into digital safety and 
          help prevent cyberbullying before it escalates.
        </p>
      </div>

      <h2 className={styles.teamTitle}>Meet the Developers</h2>
      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.memberCard}>
            <div className={styles.cardHeader}>
              <h4>{member.name}</h4>
              <span className={styles.roleTag}>{member.role}</span>
            </div>
            <p className={styles.studiesText}><strong>Education:</strong> {member.studies}</p>
            <p className={styles.bioText}>{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;