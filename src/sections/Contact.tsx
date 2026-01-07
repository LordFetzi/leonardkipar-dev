import '../css/contact.css'
import { useLang } from '../components/LanguageContext'
import { ReactComponent as Logo } from '../assets/lk_logo.svg';
import { ReactComponent as Github } from '../assets/github.svg';
import { ReactComponent as Reddit } from '../assets/reddit.svg';
import { ReactComponent as Discord } from '../assets/discord.svg';
import { ReactComponent as X } from '../assets/x.svg';
import { type CSSProperties } from 'react'

export default function Contact() {
    const { t } = useLang();
    const email = t("contact.email.value");
    const emailSubject = t("contact.email.subject");
    const emailBody = t("contact.email.body");
    const socials = [
        {
            label: t("contact.social.github.label"),
            url: t("contact.social.github.url"),
            icon: Github,
            c1: "#6e7681",
            c2: "#c9d1d9"
        },
        {
            label: t("contact.social.reddit.label"),
            url: t("contact.social.reddit.url"),
            icon: Reddit,
            c1: "#ff4500",
            c2: "#ff7a39"
        },
        {
            label: t("contact.social.discord.label"),
            url: t("contact.social.discord.url"),
            icon: Discord,
            c1: "#5865F2",
            c2: "#8EA1E1"
        },
        {
            label: t("contact.social.x.label"),
            url: t("contact.social.x.url"),
            icon: X,
            c1: "#111111",
            c2: "#4a4a4a"
        }
    ];

    return (
        <div className="contactWrapper">
            <div className='contact'>
                <h2>{t("nav.contact")}</h2>
                <div className='contactCard'>
                    <div className='contactCardHeader'>
                        <div className='contactLogoBorder'>
                            <Logo className='contactLogo'/>
                        </div>
                        <div className='contactCardTitle'>
                            <p className='contactLabel'>{t("contact.card.label")}</p>
                            <h3>{t("contact.card.title")}</h3>
                        </div>
                    </div>

                    <p className='contactCardText'>{t("contact.card.text")}</p>

                    <div className='contactDetails'>
                        <a
                            className='contactDetail contactBeamItem'
                            href={`mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                            style={{
                                '--accent-1': '#6db1fa',
                                '--accent-2': '#3178C6'
                            } as CSSProperties}
                        >
                            <span className='contactBeamBorder'>
                                <span className='contactBeam' />
                            </span>
                            <span className='contactDetailLabel'>{t("contact.email.label")}</span>
                            <span className='contactDetailValue'>{email}</span>
                        </a>
                    </div>
                    
                    <p className='contactCardText'>{t("contact.social.text")}</p>

                    <div className='contactSocials'>
                        {socials.map((social) => {
                            const Icon = social.icon;
                            return (
                            <a
                                key={social.label}
                                className='contactSocialButton contactBeamItem'
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    '--accent-1': social.c1,
                                    '--accent-2': social.c2
                                } as CSSProperties}
                            >
                                <span className='contactBeamBorder'>
                                    <span className='contactBeam' />
                                </span>
                                <span className='contactSocialIcon'>
                                    <Icon className='contactSocialIconSvg' aria-hidden="true" focusable="false" />
                                </span>
                                <span className='contactSocialLabel'>{social.label}</span>
                            </a>
                        )})}
                    </div>
                </div>
            </div>
        </div>
    )
}
