import AcademicList from '../components/sections/AcademicList.jsx'
import HomeAcademicFlow from '../components/sections/HomeAcademicFlow.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'

export default function AcademicsPage() {
	return (
		<section className="py-12 pb-24 md:py-20 md:pb-36">
			<SectionHeading kicker="02 / Academics" title="A foundation built for depth." text="Explore the academic journey, institutions and learning milestones behind the work." />
			<AcademicList />
			<HomeAcademicFlow />
		</section>
	)
}
