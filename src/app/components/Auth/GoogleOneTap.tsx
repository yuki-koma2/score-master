'use client'

import Script from 'next/script'
import { CredentialResponse } from 'google-one-tap'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { createClient } from "@/app/lib/supabase/client";

const OneTapComponent = () => {
    const supabase = createClient()
    const router = useRouter()

    // generate nonce to use for google id token sign-in
    const generateNonce = async (): Promise<string[]> => {
        const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
        const encoder = new TextEncoder()
        const encodedNonce = encoder.encode(nonce)
        const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

        return [nonce, hashedNonce]
    }

    useEffect(() => {
        const initializeGoogleOneTap = () => {
            console.log('Initializing Google One Tap')
            window.addEventListener('load', async () => {
                const [nonce, hashedNonce] = await generateNonce()

                // check if there's already an existing session before initializing the one-tap UI
                const {data, error} = await supabase.auth.getSession()
                if (error) {
                    console.error('Error getting session', error)
                }
                if (data.session) {
                    router.push('/')
                    return
                }

                // initialize the one-tap UI
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                google.accounts.id.initialize({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
                    callback: async (response: CredentialResponse) => {
                        console.log('Google Response Credential:', response.credential);
                        try {
                            // send id token returned in response.credential to supabase
                            const {data, error} = await supabase.auth.signInWithIdToken({
                                provider: 'google',
                                token: response.credential,
                                nonce,
                            })

                            if (error) {
                                console.error('Supabase signInWithIdToken error:', error);
                                throw error;
                            }
                            console.log('Session data: ', data)
                            console.log('Successfully logged in with Google One Tap')

                            // redirect to protected page
                            router.push('/')
                        } catch (error) {
                            console.error('Error logging in with Google One Tap', error)
                        }
                    },
                    nonce: hashedNonce,
                    // with chrome's removal of third-party cookiesm, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
                    use_fedcm_for_prompt: true,
                })
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                google.accounts.id.prompt() // Display the One Tap UI
            })
        }
        initializeGoogleOneTap()
        return () => window.removeEventListener('load', initializeGoogleOneTap)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Script src="https://accounts.google.com/gsi/client"/>
            <div id="oneTap" className="fixed top-0 right-0 z-[100]"/>
        </>
    )
}

export default OneTapComponent
