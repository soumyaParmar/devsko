"use client"
import React, { useState } from 'react'

interface ContentSectionProps<T> {
    heading: string,
    list: T[],
    ItemComponent: React.FC<T>
    EmptyComponent?: React.FC
    minCount?: number,
    loading?: boolean,
    LoadingComponent?: React.FC
}

const ContentSection = <T,>({ list, heading, ItemComponent, minCount = list.length, EmptyComponent = DefaultEmptyComponent, loading = false, LoadingComponent = DefaultLoaderComponet }: ContentSectionProps<T>) => {
    const [isShowingAll, setIsShowingAll] = useState(false);

    const mappedList = () => {
        let _minCount = list.length;
        if (!isShowingAll) {
            _minCount = minCount;
        }

        if (_minCount == 0) {
            return <EmptyComponent />;
        }
        return list.slice(0, _minCount).map((item: T, index) =>
            <ItemComponent key={index} {...item} />
        )
    }

    const array = Array.from({ length: minCount }, (_, index) => index + 1);

    if (loading) {
        return <div className='flex flex-col gap-3 pb-6'>
            <div className='flex justify-between items-end'>
                <span className='font-medium text-lg'>{heading}</span>
            </div>
            <div className='flex flex-wrap gap-2'>
                {
                    array.map((_, index) =>
                        <LoadingComponent key={index} />
                    )
                }
            </div>
        </div>
    }

    return (
        <div className='flex flex-col gap-3 pb-6'>
            <div className='flex justify-between items-end'>
                <span className='font-medium text-lg'>{heading}</span>
                {minCount != list.length && <span className='text-sm text-slate-600 cursor-pointer' onClick={() => { setIsShowingAll((pre) => !pre) }}>
                    {
                        isShowingAll ?
                            "View less"
                            : "View all"
                    }
                </span>}
            </div>
            <div className='flex flex-wrap gap-2'>
                {mappedList()}
            </div>
        </div>
    )
}

const DefaultLoaderComponet = () => {
    return <div>hello</div>
}

const DefaultEmptyComponent = () => {
    return (
        <div className='flex justify-center items-center border w-full h-40 p-4 rounded-xl'> No Records found</div>
    )
}

export default ContentSection