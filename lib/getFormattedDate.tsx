export default function getFormattedPostDate(dateString: string): string {
    return new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(new Date(dateString))
}