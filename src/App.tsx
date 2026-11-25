import { useEffect } from 'react';
import { HeaderNav } from './components/navigation/HeaderNav';
import { DressCodeSection } from './components/sections/DressCodeSection';
import { FooterSection } from './components/sections/FooterSection';
import { GallerySection } from './components/sections/GallerySection';
import { HeroSection } from './components/sections/HeroSection';
import { InvitationSection } from './components/sections/InvitationSection';
import { LocationSection } from './components/sections/LocationSection';
import { RsvpSection } from './components/sections/RsvpSection';
import { TimelineSection } from './components/sections/TimelineSection';
import { VideoStorySection } from './components/sections/VideoStorySection';
import { applyThemeTokens } from './config/themes';
import { weddingConfig } from './config/weddingConfig';

export function App() {
  const { sections, themeId, meta } = weddingConfig;

  useEffect(() => {
    applyThemeTokens(themeId);
    document.title = meta.pageTitle;
    document.documentElement.lang = meta.language;
  }, [themeId, meta.pageTitle, meta.language]);

  const firstContentSectionId = sections.invitation
    ? 'invitation'
    : sections.timeline
      ? 'timeline'
      : sections.location
        ? 'location'
        : 'rsvp';

  return (
    <div className="min-h-screen bg-bg text-ink">
      <HeaderNav config={weddingConfig} />

      <main>
        {sections.hero && (
          <HeroSection
            config={weddingConfig}
            nextSectionId={firstContentSectionId}
          />
        )}

        {sections.invitation && <InvitationSection config={weddingConfig} />}
        {sections.timeline && <TimelineSection config={weddingConfig} />}
        {sections.gallery && <GallerySection config={weddingConfig} />}
        {sections.videoStory && <VideoStorySection config={weddingConfig} />}
        {sections.location && <LocationSection config={weddingConfig} />}
        {sections.dressCode && <DressCodeSection config={weddingConfig} />}
        {sections.rsvp && <RsvpSection config={weddingConfig} />}
      </main>

      {sections.footer && <FooterSection config={weddingConfig} />}
    </div>
  );
}

export default App;
