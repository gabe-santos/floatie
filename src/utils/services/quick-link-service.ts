import { QuickLinkType } from '../../types/quick-link';

const QUICKLINKS_KEY = 'floatie-quicklinks';

export const fetchQuickLinks = async (): Promise<QuickLinkType[]> => {
  const quickLinks = localStorage.getItem(QUICKLINKS_KEY);
  return quickLinks ? JSON.parse(quickLinks) : [];
};

export const addQuickLink = async (
  quickLink: QuickLinkType,
): Promise<QuickLinkType> => {
  const quickLinks = await fetchQuickLinks();
  quickLinks.push(quickLink);
  localStorage.setItem(QUICKLINKS_KEY, JSON.stringify(quickLinks));
  console.log('Quick link:', quickLink.title, 'added');
  return quickLink;
};

export const updateQuickLink = async (
  updatedQuickLink: QuickLinkType,
): Promise<QuickLinkType> => {
  const quickLinks = await fetchQuickLinks();
  const quickLinkIndex = quickLinks.findIndex(
    (link) => link.url === updatedQuickLink.url,
  );
  quickLinks[quickLinkIndex] = updatedQuickLink;
  localStorage.setItem(QUICKLINKS_KEY, JSON.stringify(quickLinks));
  console.log(updatedQuickLink, ' successfully updated');
  return updatedQuickLink;
};

export const deleteQuickLink = async (quickLinkId: number): Promise<void> => {
  let quickLinks = await fetchQuickLinks();
  quickLinks = quickLinks.filter((link) => link.id !== quickLinkId);
  localStorage.setItem(QUICKLINKS_KEY, JSON.stringify(quickLinks));
  console.log(`Deleted quick link "${quickLinkId}"`);
};
