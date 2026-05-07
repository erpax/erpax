'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { PayloadSDKError } from '@payloadcms/sdk'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getPayloadSdk } from '@/utilities/payloadSdk'

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
  const numericFormID = typeof formID === 'string' ? Number(formID) : formID
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

        if (typeof numericFormID !== 'number' || Number.isNaN(numericFormID)) {
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
              form: numericFormID,
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
              message: err.errors?.[0]?.message || err.message || t('internal-server-error'),
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
    [router, numericFormID, redirect, confirmationType, t],
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
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formElementID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
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
