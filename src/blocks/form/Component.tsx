'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { PayloadSDKError } from '@payloadcms/sdk'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/rich/text'
import { Button } from '@/ui'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { getPayloadSdk } from '@/payload/sdk'

import { fields } from './fields'

/**
 * Payload form-builder block renderer — react-hook-form-driven dynamic field rendering.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @rfc 5322 internet-message-format email-field-validation
 * @quality ISO-25010 usability form-rendering
 * @see docs/STANDARDS.md §4.3
 */

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props
  const formElementID = String(formID ?? 'form')

  const formMethods = useForm<Record<string, unknown>>({
    defaultValues: (formFromProps.fields as unknown as Record<string, unknown>) ?? {},
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()

  const router = useRouter()
  const t = useTranslations()

  const onSubmit = useCallback(
    (data: Record<string, unknown>) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value: typeof value === 'string' ? value : JSON.stringify(value ?? ''),
        }))

        if (!formID) {
          setError({
            message: t('invalid-form-id'),
          })
          return
        }

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          await getPayloadSdk().create({
            collection: 'form-submissions',
            data: {
              form: formID,
              submissionData: dataToSend,
            },
          })

          clearTimeout(loadingTimerID)

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          clearTimeout(loadingTimerID)
          setIsLoading(false)
          if (err instanceof PayloadSDKError) {
            setError({
              message: err.message || t('internal-server-error'),
              status: String(err.status),
            })
          } else {
            setError({
              message: t('something-went-wrong'),
            })
          }
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType, t],
  )

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>{t('loading')}</p>}
          {error && (
            <div className="text-red-600 text-sm mb-4" role="alert">
              {error.status ? `${error.status}: ` : ''}
              {error.message}
            </div>
          )}
          {!hasSubmitted && (
            <form id={formElementID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // Runtime dispatch by blockType picks the matching field
                    // component; TS can't relate the heterogeneous prop union.
                    const Field = fields?.[field.blockType as keyof typeof fields] as
                      | React.FC<Record<string, unknown>>
                      | undefined
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button form={formElementID} type="submit" variant="default">
                {submitButtonLabel || t('submit')}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
