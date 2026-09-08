import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Work } from '../sections/Work';
import { Engineering } from '../sections/Engineering';
import { ProblemSolving } from '../sections/ProblemSolving';
import { Hackathons } from '../sections/Hackathons';
import { Journey } from '../sections/Journey';
import { Contact } from '../sections/Contact';

export function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Engineering />
      <ProblemSolving />
      <Hackathons />
      <Journey />
      <Contact />
    </main>
  );
}
