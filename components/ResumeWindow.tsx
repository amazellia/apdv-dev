
import { useState } from 'react';
import Image from 'next/image';
import { render } from 'storyblok-rich-text-react-renderer';
import { optimizeCloudinaryImage } from '../utils/cloudinary';
import styles from '../styles/Home.module.scss';

export type ResumeComponent = 'experience' | 'education' | 'achievement' | 'volunteering';

export type MediaAsset = {
	filename: string;
	alt?: string;
	width?: number;
	height?: number;
	public_id?: string;
};

export type ResumeItem = {
	_uid: string;
	component: ResumeComponent;
	description?: { type: string; content: any[] };
	media?: MediaAsset[];
	// experience
	title?: string;
	company?: string;
	startDate?: string;
	endDate?: string;
	currentRole?: boolean;
	employment_type?: string;
	location?: string;
	// education
	degree?: string;
	school?: string;
	fieldOfStudy?: string;
	// achievement
	issuer?: string;
	date?: string;
	// volunteering
	role?: string;
	organisation?: string;
	cause?: string;
};

const TABS: ResumeComponent[] = ['experience', 'education', 'achievement', 'volunteering'];

function parseDate(dateStr: string): Date | null {
	if (!dateStr) return null;
	// Storyblok sends "YYYY-MM-DD HH:mm" — replace space with T for reliable parsing
	const d = new Date(dateStr.replace(' ', 'T'));
	return isNaN(d.getTime()) ? null : d;
}

function formatDate(dateStr: string): string {
	const d = parseDate(dateStr);
	if (!d) return '';
	return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function formatDateRange(start?: string, end?: string, current?: boolean): string {
	const startStr = start ? formatDate(start) : '';
	const endStr = current ? 'Present' : (end ? formatDate(end) : '');
	if (startStr && endStr) return `${startStr} – ${endStr}`;
	return startStr || endStr;
}

function getLatestDate(item: ResumeItem): string {
	switch (item.component) {
		case 'experience':
		case 'education':
		case 'volunteering':
			return item.startDate || item.endDate || '';
		case 'achievement':
			return item.date || '';
	}
}

function hasRichTextContent(doc?: { type: string; content: any[] }): boolean {
	if (!doc?.content?.length) return false;
	return doc.content.some(node =>
		node.content?.length > 0 ||
		node.type === 'bullet_list' ||
		node.type === 'ordered_list'
	);
}

const isVideoAsset = (filename: string) =>
	/\.(mp4|webm|mov|avi|ogv)(\?.*)?$/i.test(filename);

const MediaStrip = ({ assets }: { assets: MediaAsset[] }) => (
	<div className={styles.resumeMedia}>
		{assets.map((asset, i) => (
			<div key={asset.public_id || i} className={styles.resumeMediaItem}>
				{isVideoAsset(asset.filename) ? (
					<video
						src={asset.filename}
						muted
						controls
						className={styles.resumeMediaAsset}
					/>
				) : (
					<Image
						src={optimizeCloudinaryImage(asset.filename, { width: 240, height: 160, crop: 'fill', quality: 80 })}
						alt={asset.alt || ''}
						width={240}
						height={160}
						className={styles.resumeMediaAsset}
					/>
				)}
			</div>
		))}
	</div>
);

const ResumeCard = ({ item }: { item: ResumeItem }) => {
	const showDescription = hasRichTextContent(item.description);
	const showMedia = !!item.media?.length;

	const renderHeader = () => {
		switch (item.component) {
			case 'experience':
				return (
					<div className={styles.resumeCardRow}>
						<div className={styles.resumeCardMain}>
							<span className={styles.resumeCardTitle}>{item.title}</span>
							<span className={styles.resumeCardSub}>
								{item.company}{item.location ? ` · ${item.location}` : ''}
							</span>
						</div>
						<div className={styles.resumeCardRight}>
							{item.employment_type && <span className={styles.resumeBadge}>{item.employment_type}</span>}
							<span className={styles.resumeCardDate}>
								{formatDateRange(item.startDate, item.endDate, item.currentRole)}
							</span>
						</div>
					</div>
				);
			case 'education':
				return (
					<div className={styles.resumeCardRow}>
						<div className={styles.resumeCardMain}>
							<span className={styles.resumeCardTitle}>{item.degree}</span>
							<span className={styles.resumeCardSub}>
								{item.school}{item.fieldOfStudy ? ` · ${item.fieldOfStudy}` : ''}
							</span>
						</div>
						<span className={styles.resumeCardDate}>
							{formatDateRange(item.startDate, item.endDate)}
						</span>
					</div>
				);
			case 'achievement':
				return (
					<div className={styles.resumeCardRow}>
						<div className={styles.resumeCardMain}>
							<span className={styles.resumeCardTitle}>{item.title}</span>
							<span className={styles.resumeCardSub}>{item.issuer}</span>
						</div>
						{item.date && <span className={styles.resumeCardDate}>{formatDate(item.date)}</span>}
					</div>
				);
			case 'volunteering':
				return (
					<div className={styles.resumeCardRow}>
						<div className={styles.resumeCardMain}>
							<span className={styles.resumeCardTitle}>{item.role}</span>
							<span className={styles.resumeCardSub}>
								{item.organisation}{item.cause ? ` · ${item.cause}` : ''}
							</span>
						</div>
						<span className={styles.resumeCardDate}>
							{formatDateRange(item.startDate, item.endDate)}
						</span>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className={styles.resumeCard}>
			{renderHeader()}
			{showDescription && (
				<div className={styles.resumeDescription}>
					{render(item.description)}
				</div>
			)}
			{showMedia && <MediaStrip assets={item.media!} />}
		</div>
	);
};

const ResumeWindow = ({ items }: { items: ResumeItem[] }) => {
	const [activeTab, setActiveTab] = useState<ResumeComponent>('experience');

	const filtered = [...items]
		.filter(item => item.component === activeTab)
		.sort((a, b) => {
			const dateA = getLatestDate(a);
			const dateB = getLatestDate(b);
			if (!dateA && !dateB) return 0;
			if (!dateA) return 1;
			if (!dateB) return -1;
			return dateB.localeCompare(dateA);
		});

	return (
		<div className={styles.resumeWindow}>
			<div className={styles.resumeTitleBar}>
				<div className={styles.resumeTrafficLights}>
					<span className={styles.tlRed} />
					<span className={styles.tlYellow} />
					<span className={styles.tlGreen} />
				</div>
				<span className={styles.resumeWindowTitle}>resume</span>
			</div>
			<div className={styles.resumeTabs}>
				{TABS.map(tab => (
					<button
						key={tab}
						className={`${styles.resumeTab} ${activeTab === tab ? styles.resumeTabActive : ''}`}
						onClick={() => setActiveTab(tab)}
					>
						{tab}
					</button>
				))}
			</div>
			<div className={styles.resumeContent}>
				{filtered.length === 0
					? <p className={styles.resumeEmpty}>No entries yet.</p>
					: filtered.map(item => <ResumeCard key={item._uid} item={item} />)
				}
			</div>
		</div>
	);
};

export default ResumeWindow;
