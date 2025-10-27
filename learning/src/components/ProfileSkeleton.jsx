import './styles/ProfileSkeleton.css'

export default function ProfileSkeleton() {
    return (
        <div className="profile-container skeleton">
            <div className="image-container skeleton-image">
                <div className="skeleton-shimmer"></div>
            </div>
            <div className="userInfo-container">
                <h2 className="user-name skeleton-text skeleton-title"></h2>
                <h3 className="user-role skeleton-text skeleton-subtitle"></h3>
                <p className="short-bio skeleton-text skeleton-bio"></p>
                <p className="short-bio skeleton-text skeleton-bio"></p>
                <p className="short-bio skeleton-text skeleton-bio-short"></p>
            </div>
            <div className="skeleton-shimmer"></div>
        </div>
    )
}