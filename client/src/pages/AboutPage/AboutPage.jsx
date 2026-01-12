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
      name: "Developer 3",
      role: "Full-Stack Developer",
      studies: "B.Sc. Software Engineering Student",
      bio: "Details coming soon... Focused on using AI to solve social issues and providing parents with smarter safety tools."
    },
    {
      name: "Developer 4",
      role: "Full-Stack Developer",
      studies: "B.Sc. Computer Science Student",
      bio: "Details coming soon... Committed to creating innovative solutions that make the internet a better place for everyone."
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