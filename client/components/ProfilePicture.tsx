interface Props {
    picUrl?: string;
    name?: string;
}

const ProfilePicture = ({ picUrl, name }: Props) => {
    const validUrl = picUrl?.includes('https://');

    if (validUrl) {
        return (
            <img
                src={picUrl}
                alt="Profile picture"
                style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}
            />
        );
    } else if (name) {
        return (
            <div aria-hidden className="rounded-full bg-red-400 h-8 w-8 flex items-center justify-center text-white font-bold">
                {name.charAt(0).toUpperCase()}
            </div>
        )

    }


}

export default ProfilePicture;